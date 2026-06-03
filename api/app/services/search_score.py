"""与前端 globalSearchIndex.scoreItem 一致的搜索相关性评分。"""


def score_match(
    *,
    query: str,
    title: str,
    subtitle: str = "",
    haystack: str = "",
    code: str | None = None,
) -> int:
    q = query.strip().lower()
    if not q:
        return 0

    title_l = title.lower()
    subtitle_l = subtitle.lower()
    hay = (haystack or " ".join([title, subtitle, haystack])).lower()
    code_l = (code if code is not None else subtitle_l.split(" · ")[0]).lower()

    score = 0
    if code_l == q:
        score += 120
    elif code_l.startswith(q):
        score += 90
    elif q in code_l:
        score += 70

    if title_l == q:
        score += 80
    elif title_l.startswith(q):
        score += 55
    elif q in title_l:
        score += 40

    if q in subtitle_l:
        score += 25
    if q in hay:
        score += 15

    terms = [t for t in q.split() if t]
    if len(terms) > 1 and all(t in hay for t in terms):
        score += 20

    return score
