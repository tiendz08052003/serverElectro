const convertListProtoryToObject = (datas) => {
    return ( datas.map(data => data.toObject()) )
}

const convertSingleProtoryToObject = (data) => {
    return (
        data ? data.toObject() : data
    )
}

export default {convertListProtoryToObject, convertSingleProtoryToObject}

