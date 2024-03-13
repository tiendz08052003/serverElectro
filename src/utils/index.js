const convertListPropertyToObject = (data) => {
    return ( data.map(el => el.toObject()) )
}

const convertSinglePropertyToObject = (data) => {
    return (
        data ? data.toObject() : data
    )
}

export default {convertListPropertyToObject, convertSinglePropertyToObject}

