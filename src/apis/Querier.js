import React, {useEffect, useState} from "react";
export default function Querier({query, prop=null, children}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [ee, setee] = useState(false);
    const [data, setData] = useState({});
    const [done, setDone] = useState(false);

    // const datax = await q(vars)

    // console.log("data!!", datax)
    async function fetcher() {
        let data = {};
        try {
            data = await query()
        }
        catch (error) {
            setError(error)
            return
        }
        console.log("DATAAA", data)
        setLoading(false)
        setData(data)
        setDone(true)
    }

    useEffect(() => {
        fetcher();
    }, [ee])

    return (loading ? <div>...Loading</div>
        : (done
            ? children({error, data: (prop? data[prop]: data), loading})
            : error ? (<div>{error.message}</div>) : <div>Something failed somewhere...</div>))
}