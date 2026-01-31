import React from 'react';
import { message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import type { MovieDirectorDataType } from '../../types/MovieDirectorDataType';
import type { MovieDataType } from '../../types/MoviesDataType';
import type { DirectorDataType } from '../../types/DirectorDataType';

const MovieDirectorTable = ({ data, movies, directors }: {
    data?: MovieDirectorDataType[],
    movies?: MovieDataType[],
    directors?: DirectorDataType[]
}) => {
    const queryClient = useQueryClient();
    const [messageApi, holder] = message.useMessage();

    const cancel = (e) => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi");
    };

    const deleteMovieDirector = async (id: string) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_director/${id}`);
            toast.success("Movie Director o'chirildi");
            queryClient.invalidateQueries({
                queryKey: ["movie_directors"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const columns: TableProps<MovieDirectorDataType>['columns'] = [
        {
            title: 'Kino Nomi',
            dataIndex: 'movie_id',
            key: 'movie_id',
            render: (text: MovieDirectorDataType["movie_id"]) => (
                <p>{movies?.find((el) => el.id === text)?.title_uz}</p>
            ),
        },
        {
            title: 'Rejissor',
            dataIndex: 'director_id',
            key: 'director_id',
            render: (text: MovieDirectorDataType["director_id"]) => (
                <p>{directors?.find((el) => el.id === text)?.full_name}</p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: MovieDirectorDataType) => (
                <Space size="middle">
                    <Popconfirm
                        title="O'chirish"
                        description="O'chirishga aminmisiz?"
                        onConfirm={() => deleteMovieDirector(record.id)}
                        onCancel={cancel}
                        okText="Ha"
                        cancelText="Yo'q"
                    >
                        <button className='text-[22px] text-red-500 border-[1px] cursor-pointer border-red-500 rounded-[5px] p-1'>
                            <MdDelete />
                        </button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            {holder}
            <Table<MovieDirectorDataType>
                style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }}
                columns={columns}
                dataSource={data}
            />
        </>
    );
};

export default MovieDirectorTable;
