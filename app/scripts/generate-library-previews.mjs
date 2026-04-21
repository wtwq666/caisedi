import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const APP_ROOT = process.cwd();
const SOURCE_ROOT = path.join(APP_ROOT, '2026');
const PREVIEW_ROOT = path.join(APP_ROOT, 'public', 'library-previews');
const OUTPUT_MAP_FILE = path.join(
  APP_ROOT,
  'src',
  'data',
  'libraryPreviewMap.generated.ts',
);
const OFFICE_EXTS = new Set(['.docx', '.pptx', '.xlsx', '.xls']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    files.push(fullPath);
  }
  return files;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function findSoffice() {
  const envPath = process.env.LIBREOFFICE_PATH?.trim();
  if (envPath) return envPath;
  const check = spawnSync('powershell', [
    '-NoProfile',
    '-Command',
    "if (Get-Command soffice -ErrorAction SilentlyContinue) { Write-Output 'soffice' }",
  ], { encoding: 'utf8' });
  const out = check.stdout.trim();
  return out || null;
}

function runConvert(sofficeCmd, inputFile, outputDir) {
  const isWin = process.platform === 'win32';
  const shellCommand = `"${sofficeCmd}" --headless --convert-to pdf --outdir "${outputDir}" "${inputFile}"`;
  return spawnSync(shellCommand, {
    shell: isWin ? 'powershell.exe' : '/bin/sh',
    stdio: 'pipe',
    encoding: 'utf8',
  });
}

async function main() {
  await ensureDir(PREVIEW_ROOT);
  const soffice = findSoffice();
  const files = await walk(SOURCE_ROOT);
  const officeFiles = files.filter((filePath) =>
    OFFICE_EXTS.has(path.extname(filePath).toLowerCase()),
  );

  const previewMap = {};

  if (!soffice) {
    console.warn('未找到 soffice，跳过高保真 PDF 生成。');
    await writePreviewMap(previewMap);
    return;
  }

  for (const absFile of officeFiles) {
    const relFromSource = path.relative(SOURCE_ROOT, absFile).replace(/\\/g, '/');
    const sourceKey = `2026/${relFromSource}`;
    const relDir = path.dirname(relFromSource);
    const baseName = path.basename(relFromSource, path.extname(relFromSource));
    const outDir = path.join(PREVIEW_ROOT, relDir);
    await ensureDir(outDir);

    const outPdfAbs = path.join(outDir, `${baseName}.pdf`);
    let shouldConvert = true;
    try {
      const [srcStat, outStat] = await Promise.all([fs.stat(absFile), fs.stat(outPdfAbs)]);
      shouldConvert = srcStat.mtimeMs > outStat.mtimeMs;
    } catch {
      shouldConvert = true;
    }

    if (shouldConvert) {
      const result = runConvert(soffice, absFile, outDir);
      if (result.status !== 0) {
        console.warn(`转换失败: ${sourceKey}`);
        console.warn(result.stderr || result.stdout);
        continue;
      }
    }

    const outPdfRel = path.relative(path.join(APP_ROOT, 'public'), outPdfAbs).replace(/\\/g, '/');
    previewMap[sourceKey] = `/${outPdfRel}`;
  }

  await writePreviewMap(previewMap);
}

async function writePreviewMap(map) {
  const lines = [
    '// 本文件由 npm run generate-library-previews 自动生成，请勿手改。',
    '',
    'export const LIBRARY_PREVIEW_PDF_MAP: Record<string, string> = {',
    ...Object.entries(map).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)},`),
    '};',
    '',
  ];
  await fs.writeFile(OUTPUT_MAP_FILE, lines.join('\n'), 'utf8');
  console.log(`已生成预览映射: ${OUTPUT_MAP_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
