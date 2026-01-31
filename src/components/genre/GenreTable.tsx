import { message, Popconfirm, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import type { GenreDataType } from '../../types/GenreDataType';

const GenreTable = ({ data }: { data?: GenreDataType[] }) => {
    const queryClient = useQueryClient();
    const [messageApi, holder] = message.useMessage();

    const cancel = (e) => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi");
    };

    const deleteGenre = async (id: number) => {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/genre/${id}`);
            toast.success("Genre o'chirildi");
            queryClient.invalidateQueries({
                queryKey: ["genres"]
            });
        } catch (err) {
            console.error("API error:", err.response?.data);
            toast.error("Xatolik ketti");
        }
    };

    const columns: TableProps<GenreDataType>['columns'] = [
        {
            title: 'Name (UZ)',
            dataIndex: 'name_uz',
            key: 'name_uz',
        },
        {
            title: 'Name (RU)',
            dataIndex: 'name_ru',
            key: 'name_ru',
        },
        {
            title: 'Name (EN)',
            dataIndex: 'name_en',
            key: 'name_en',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: GenreDataType) => (
                <Space size="middle">
                    <Popconfirm
                        title="O'chirish"
                        description="O'chirishga aminmisiz?"
                        onConfirm={() => deleteGenre(record.id)}
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
            <Table<GenreDataType>
                style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }}
                columns={columns}
                dataSource={data}
            />
        </>
    );
};

export default GenreTable;
