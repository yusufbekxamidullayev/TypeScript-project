import React from 'react';
import {     message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import type { MovieActorDataType } from '../../types/MovieActorType';
import type { ActorDataType } from '../../types/ActorTypes';
import type { MovieDataType } from '../../types/MoviesDataType';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';


const MovieActorTable = ({data , actors , movies}:{data?:MovieActorDataType[] , actors?:ActorDataType[] , movies?: MovieDataType[]}) => {
    console.log(actors);
    
    const [messageApi, holder] = message.useMessage();
    const queryClient = useQueryClient()

    async function deleteMovieActor(id:string){
        try{
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_actor/${id}`);
            toast.success("O'chirildi");
            queryClient.invalidateQueries({
                queryKey:["movie_actors"]
            })
        }catch(err){
            console.log(err);
            toast.error("Xato ketti")
        }
    }

    const cancel = e => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi")
    };

const columns: TableProps<MovieActorDataType>['columns'] = [
    {
        title: 'Kino Nomi',
        dataIndex: 'movie_id',
        key: 'movie_id',
        render: (text: MovieActorDataType["movie_id"]) => (
        <p>{movies?.find((el) => el.id === text)?.title_uz}</p>),
    },
    {
        title: 'Aktyor Nomi',
        dataIndex: 'actor_id',
        key: 'actor_id',
        render: (text: MovieActorDataType["actor_id"]) => (<p>
            {actors?.find((el) => el.id === text)?.full_name}
        </p>),

    },
    {
        title: 'Oynagan roli',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_:unknown , record:MovieActorDataType) => (
            <Space size="middle">
                <Popconfirm
                    title="O'chirish"
                    description="O'chirishga aminmisiz?"
                    onConfirm={() => deleteMovieActor(record?.id)}
                    onCancel={cancel}
                    okText="Ha"
                    cancelText="Yo'q"
                >
                    <button className='text-[22px] text-red-500 border-[1px] cursor-pointer border-red-500 rounded-[5px] p-1'><MdDelete /></button>
                </Popconfirm>
            </Space>
        ),
    },
];


    return <Table<MovieActorDataType> style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }} columns={columns} dataSource={data} />;
}
export default MovieActorTable;