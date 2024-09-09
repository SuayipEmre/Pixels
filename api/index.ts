import axios from "axios"

const baseUrl = 'https://pixabay.com/api/'

const apiKey = '45828083-ad7d1f236cec5e309e17b954e'



const apiUrl = `${baseUrl}?key=${apiKey}`


const formatUrl =  (params: Record<string, string | number>) => {
    let url = apiUrl + `&per_page=25&safesearch=true&editors_choice=true`
    if (!params) return url

    let paramKeys = Object.keys(params)
    paramKeys.map(key => {
        let value = key == 'q' ? encodeURIComponent(params[key]) : params[key]
        url += `&${key}=${value}`
    })

    return url
    
}

export const apiCall = async  (params: Record<string, string | number>) => {
    try {
        const response = await axios.get(formatUrl(params))
        const {data} = response
        return  {success : true, data}
    } catch (error) {
        error instanceof Error ?
            console.log(error.message) :
            console.log("An unknown error occurred.")
            return {success : false, data : null}

    }
}