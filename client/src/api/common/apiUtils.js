function getToken(){
    return localStorage.getItem('id_token')
}

export async function configurateAsync(isBearerAuth){
    const ContentTypeJSON = 'application/json'
    const AcceptJSON = 'application/json'
    let config = {}
    if(isBearerAuth){
        const token = await getToken();
        const authStr = 'Bearer '.concat(token)
        config={
           headers: {accept:AcceptJSON, contentType:ContentTypeJSON, Authorization:authStr}
        }
    }else{
        config={
            headers: {accept:AcceptJSON, contentType:ContentTypeJSON}
        }
    }

    return config
}
