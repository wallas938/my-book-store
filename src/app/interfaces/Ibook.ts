export interface Ibook {
    id: String,
    title: String,
    author: String,
    price: number,
    currencyCode: String,
    identifier: number,
    categories: Array<String>,
    description: String,
    language: String,
    thumbnail: String,
    averageRating: number,
    pageCount: String,
    isEbook: Boolean,
    isInCart: Boolean
}