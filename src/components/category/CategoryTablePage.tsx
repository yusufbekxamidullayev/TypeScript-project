import { Table, Space, Button } from 'antd';
import type { TableProps } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import type { CategoryType } from '../../types/CategoryType';


const CategoryTablePage = ({ data }: { data?: CategoryType[] }) => {

    const queryClient = useQueryClient()

    async function deleteCategory(id: string) {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/category/${id}`)
                toast.success("O'chirildi")
            queryClient.invalidateQueries({
                    queryKey: ["category"]
                })
        } catch (err) {
            console.log(err);
            toast.error("Xatolik yuz berdi")
        }
    }

    const columns: TableProps<CategoryType>['columns'] = [
        {
            title: 'Uzbek',
            dataIndex: 'name_uz',
            key: 'name_uz',
            render: (text: CategoryType["name_uz"]) => <a>{text}</a>,
        },
        {
            title: 'Russia',
            dataIndex: 'name_ru',
            key: 'name_ru',
            render: (text: CategoryType["name_ru"]) => <a>{text}</a>,
        },
        {
            title: 'English',
            dataIndex: 'name_en',
            key: 'name_en',
            render: (text: CategoryType["name_en"]) => <a>{text}</a>,
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Order Number',
            dataIndex: 'order_number',
            key: 'order_number',
        },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'is_active',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: CategoryType) => (
                <Space size="middle">
                    <Button danger
                        onClick={() => deleteCategory(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table<CategoryType> columns={columns} dataSource={data} />
};

export default CategoryTablePage;