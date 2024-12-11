import fetch from 'node-fetch'

const API_URL = 'https://json-server-five-orcin.vercel.app/'

const resolvers = {
    Query:{
        async movies(){
            const response = await fetch(`${API_URL}/movies`)
            return response.json()
        },
        async movie(_, { id }){
            const response = await fetch(`${API_URL}/movies/${id}`)
            return response.json()
        },
        async featuredMovies(){
            const response = await fetch(`${API_URL}/featured`)
            return response.json()
        },
        async moviesByGenre(_, { genre, limit }){
            let url = new URL(`${API_URL}/movies`)
            url.searchParams.append('genre', genre)
            if(limit){
                url.searchParams.append('limit', limit)
            }
            const response = await fetch(url.toString())
            if(!response.ok){
                throw new Error('failure to fetch movies')
            }
            return response.json()
        }
    }
}

export default resolvers