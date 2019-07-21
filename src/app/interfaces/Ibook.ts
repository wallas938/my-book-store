export interface Ibook {
    id: String,
    title: String,
    author: String,
    price: [Number, String],
    currencyCode: String,
    categories: Array<String>,
    description: String,
    language: String,
    thumbnail: String,
    averageRating: Number,
    pageCount: String,
    isEbook: Boolean,
}