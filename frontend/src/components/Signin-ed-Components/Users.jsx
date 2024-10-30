import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../Auth-Components/Button';
import { useNavigate } from 'react-router-dom';

function useDebounce(value, timeout) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        let timeoutNumber = setTimeout(() => {
            setDebouncedValue(value)
        }, timeout)

        return () => {
            clearTimeout(timeoutNumber)
        }
    }, [value])

    return debouncedValue;
}

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const debouncedValue = useDebounce(filter, 500)

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/user/bulk?filter=' + debouncedValue)
            .then(response => {
                setUsers(response.data.users);
            })
    }, [debouncedValue])

    return <>
        <div className="font-bold mt-6 text-lg ">
            Users
        </div>
        <div className="my-2">
            <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"
                onChange={e => setFilter(e.target.value)}
            ></input>
        </div>
        <div>
            {users.map((user, index) => <User user={user} key={index} />)}
        </div>
    </>
}
function User({ user }) {
    const navigate = useNavigate()

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"}
                onClick={(e) => {
                    navigate(`/send?id=${user._id}&name=${user.firstName}`);
                }}
            />
        </div>
    </div>
}

export default Users