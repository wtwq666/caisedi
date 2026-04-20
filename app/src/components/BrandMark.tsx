import { cn } from '@/lib/utils';

type BrandMarkSize = 'sm' | 'md' | 'lg';

const sizeClasses: Record<
  BrandMarkSize,
  { wrap: string; title: string; subtitle: string }
> = {
  sm: {
    wrap: 'gap-0',
    title: 'text-base font-semibold tracking-wide',
    subtitle: 'hidden',
  },
  md: {
    wrap: 'gap-0',
    title: 'text-lg font-semibold tracking-wide',
    subtitle: 'text-xs text-brand-gray-muted font-normal leading-tight',
  },
  lg: {
    wrap: 'gap-0',
    title: 'text-2xl font-bold tracking-wide',
    subtitle: 'text-sm text-brand-gray-muted font-normal',
  },
};

type BrandMarkProps = {
  size?: BrandMarkSize;
  /** sm: CAISEDI only */
  compact?: boolean;
  className?: string;
  vertical?: boolean;
};

export function BrandMark({
  size = 'md',
  compact,
  className,
  vertical,
}: BrandMarkProps) {
  const s = sizeClasses[size];
  const showSubtitle = !compact && s.subtitle !== 'hidden';

  const textBlock = (
    <div className="min-w-0 text-left">
      <div className={cn('text-brand-ink', s.title)}>CAISEDI</div>
      {showSubtitle && (
        <div
          className={cn(
            s.subtitle,
            'mt-0.5 max-w-[14rem] truncate sm:max-w-none sm:whitespace-normal',
          )}
        >
          凯施迪服装有限公司
        </div>
      )}
    </div>
  );

  if (vertical) {
    return (
      <div
        className={cn('flex flex-col items-center text-center', className)}
      >
        <div className={cn(s.title, 'text-brand-ink')}>CAISEDI</div>
        {!compact && (
          <div
            className={cn(
              'mt-1',
              s.subtitle,
              'text-brand-gray-muted max-w-xs',
            )}
          >
            凯施迪服装有限公司
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', s.wrap, className)}>{textBlock}</div>
  );
}
