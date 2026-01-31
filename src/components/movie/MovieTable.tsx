import React from 'react';
import { Image, message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import type { MovieDataType } from '../../types/MoviesDataType';

const MovieTable = ({ data }: { data?: MovieDataType[] }) => {
    const queryClient = useQueryClient();
    const [messageApi, holder] = message.useMessage();

    const cancel = (e) => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi");
    };

    const deleteMovie = async (id: string) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie/${id}`);
            toast.success("Movie o'chirildi");
            queryClient.invalidateQueries({
                queryKey: ["movies"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const columns: TableProps<MovieDataType>['columns'] = [
        {
            title: 'Poster',
            dataIndex: 'poster_url',
            key: 'poster_url',
            render: (text: MovieDataType["poster_url"]) => (
                <Image
                    src={text}
                    style={{ width: "60px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
                />
            ),
        },
        {
            title: 'Title (UZ)',
            dataIndex: 'title_uz',
            key: 'title_uz',
        },
        {
            title: 'Title (RU)',
            dataIndex: 'title_ru',
            key: 'title_ru',
        },
        {
            title: 'Title (EN)',
            dataIndex: 'title_en',
            key: 'title_en',
        },
        {
            title: 'Release Year',
            dataIndex: 'release_year',
            key: 'release_year',
        },
        {
            title: 'IMDB Rating',
            dataIndex: 'imdb_rating',
            key: 'imdb_rating',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
        },
        {
            title: 'Duration (min)',
            dataIndex: 'duration_minutes',
            key: 'duration_minutes',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: MovieDataType) => (
                <Space size="middle">
                    <Popconfirm
                        title="O'chirish"
                        description="O'chirishga aminmisiz?"
                        onConfirm={() => deleteMovie(record.id)}
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
            <Table<MovieDataType>
                style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }}
                columns={columns}
                dataSource={data}
                scroll={{ x: true }}
            />
        </>
    );
};

export default MovieTable;
