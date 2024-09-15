export type FilterRowProps = {
    data: string[],
    filterName: string,
    setFilters: (value: boolean | null) => void
    filters: any
}