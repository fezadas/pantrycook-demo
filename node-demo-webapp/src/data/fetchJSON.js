export async function fetchJSON(url, options = { method: 'GET', credentials: 'same-origin' }) {
    console.log(options.method + " "+ url)
    const resp = await fetch(url, options)
    const body = await resp.json()
    console.log(body)
    if(resp.status < 200 || resp.status >= 300) throw {statusCode:resp.status,body}
    else return body
}