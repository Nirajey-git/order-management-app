export function getCacheKey(page, perPage, search) {
    return `orders:page=${page}:perPage=${perPage}:search=${search || ''}`;
}