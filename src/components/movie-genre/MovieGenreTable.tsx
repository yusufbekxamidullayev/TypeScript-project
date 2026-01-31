import React from 'react';
import { message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import type { MovieGenreDataType } from '../../types/MovieGenreDataType';
import type { MovieDataType } from '../../types/MoviesDataType';
import type { GenreDataType } from '../../types/GenreDataType';

const MovieGenreTable = ({ data, movies, genres }: {
    data?: MovieGenreDataType[],
    movies?: MovieDataType[],
    genres?: GenreDataType[]
}) => {
    const queryClient = useQueryClient();
    const [messageApi, holder] = message.useMessage();

    const cancel = (e) => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi");
    };

    const deleteMovieGenre = async (id: string) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_genre/${id}`);
            toast.success("Movie Genre o'chirildi");
            queryClient.invalidateQueries({
                queryKey: ["movie_genres"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const columns: TableProps<MovieGenreDataType>['columns'] = [
        {
            title: 'Kino Nomi',
            dataIndex: 'movie_id',
            key: 'movie_id',
            render: (text: MovieGenreDataType["movie_id"]) => (
                <p>{movies?.find((el) => el.id === text)?.title_uz}</p>
            ),
        },
        {
            title: 'Janr',
            dataIndex: 'genre_id',
            key: 'genre_id',
            render: (text: MovieGenreDataType["genre_id"]) => (
                <p>{genres?.find((el) => el.id === text)?.genre_name_uz}</p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: MovieGenreDataType) => (
                <Space size="middle">
                    <Popconfirm
                        title="O'chirish"
                        description="O'chirishga aminmisiz?"
                        onConfirm={() => deleteMovieGenre(record.id)}
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
            <Table<MovieGenreDataType>
                style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }}
                columns={columns}
                dataSource={data}
            />
        </>
    );
};

export default MovieGenreTable;
