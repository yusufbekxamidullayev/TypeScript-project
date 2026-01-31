import React from 'react';
import { Image, message, Popconfirm, Space, Table} from 'antd';
import type { TableProps } from 'antd';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import type { DirectorDataType } from '../../types/DirectorDataType';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';


const DirectorTable = ({data}:{data?:DirectorDataType[]}) => {
    const [messageApi, holder] = message.useMessage();
    const queryClient = useQueryClient()

    async function deleteDirector(id: string) {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/director/${id}`);
            toast.success("O'chirildi");
            queryClient.invalidateQueries({
                queryKey: ["directors"]
            })
        } catch (err) {
            console.log(err);
            toast.error("Xato ketti")
        }
    }

    const cancel = e => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi")
    };

const columns: TableProps<DirectorDataType>['columns'] = [
    {
        title: 'Photo',
        dataIndex: 'photo_url',
        key: 'photo',
        render: (text: DirectorDataType["photo_url"]) => <Image src={text} className='w-[60px] h-[60px]' style={{width:"60px" , height:"60px" , objectFit:"cover" , borderRadius:"50%"}}/>
    },
    {
        title: 'Name',
        dataIndex: 'full_name',
        key: 'name',
        render: (text: DirectorDataType["full_name"]) => <a>{text}</a>,
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Biography',
        dataIndex: 'biography',
        key: 'biography',
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <Flex gap="small" align="center" wrap>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </Flex>
    //     ),
    // },
    {
        title: 'Action',
        key: 'action',
        render: (_:unknown , record:DirectorDataType) => (
            <Space size="middle">
                <Popconfirm
                    title="O'chirish"
                    description="O'chirishga aminmisiz?"
                    onConfirm={() => deleteDirector(record.id)}
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


    return <Table<DirectorDataType> style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }} columns={columns} dataSource={data} />;
}
export default DirectorTable;