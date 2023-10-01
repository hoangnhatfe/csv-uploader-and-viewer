export interface Payload {
  data: Data[]
  meta: Meta
}

export interface Data {
  id: number
  postId: number
  name: string
  email: string
  body: string
  createdAt: string
  updatedAt: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
