async function fetchJSON(url, options = { method: 'GET', credentials: 'same-origin' }) {
    const resp = await fetch(url, options)
    const body = await resp.json()
    console.log('method: '+options.method+' '+url)
    console.log('statusCode: '+resp.status)
    console.log(body)
    if(resp.status < 200 || resp.status >= 300) throw {statusCode:resp.status,body}
    else return body
}

export default fetchJSON