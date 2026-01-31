import React from 'react';
import { message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import type { MovieCategoryDataType } from '../../types/MovieCategoryDataType';
import type { MovieDataType } from '../../types/MoviesDataType';
import type { CategoryDataType } from '../../types/CategoryDataType';

const MovieCategoryTable = ({ data, movies, categories }: {
    data?: MovieCategoryDataType[],
    movies?: MovieDataType[],
    categories?: CategoryDataType[]
}) => {
    const queryClient = useQueryClient();
    const [messageApi, holder] = message.useMessage();

    const cancel = (e) => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi");
    };

    const deleteMovieCategory = async (id: string) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_category/${id}`);
            toast.success("Movie Category o'chirildi");
            queryClient.invalidateQueries({
                queryKey: ["movie_categories"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const columns: TableProps<MovieCategoryDataType>['columns'] = [
        {
            title: 'Kino Nomi',
            dataIndex: 'movie_id',
            key: 'movie_id',
            render: (text: MovieCategoryDataType["movie_id"]) => (
                <p>{movies?.find((el) => el.id === text)?.title_uz}</p>
            ),
        },
        {
            title: 'Kategoriya',
            dataIndex: 'category_id',
            key: 'category_id',
            render: (text: MovieCategoryDataType["category_id"]) => (
                <p>{categories?.find((el) => el.id === text)?.name_uz}</p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: MovieCategoryDataType) => (
                <Space size="middle">
                    <Popconfirm
                        title="O'chirish"
                        description="O'chirishga aminmisiz?"
                        onConfirm={() => deleteMovieCategory(record.id)}
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
            <Table<MovieCategoryDataType>
                style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }}
                columns={columns}
                dataSource={data}
            />
        </>
    );
};

export default MovieCategoryTable;
