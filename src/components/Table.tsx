import React from 'react';
import { Button, Flex, Image, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import type { ActorDataType } from '../types/ActorTypes';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';


const ActorTable = ({data}:{data?:ActorDataType[]}) => {
    const [messageApi, holder] = message.useMessage();

    const cancel = e => {
        console.log(e);
        messageApi.error('Click on No');
        toast.warning("O'chirish bekor qilindi")
    };

const columns: TableProps<ActorDataType>['columns'] = [
    {
        title: 'Photo',
        dataIndex: 'photo_url',
        key: 'photo',
        render: (text: ActorDataType["photo_url"]) => <Image src={text} className='w-[60px] h-[60px]' style={{width:"60px" , height:"60px" , objectFit:"cover" , borderRadius:"50%"}}/>
    },
    {
        title: 'Name',
        dataIndex: 'full_name',
        key: 'name',
        render: (text: ActorDataType["full_name"]) => <a>{text}</a>,
    },
    {
        title: 'Birth Year',
        dataIndex: 'birth_year',
        key: 'birth_year',
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
        render: (_:unknown , record:ActorDataType) => (
            <Space size="middle">
                <Popconfirm
                    title="O'chirish"
                    description="O'chirishga aminmisiz?"
                    // onConfirm={() => DeleteCountry(record.id)}
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


    return <Table<ActorDataType> style={{ overflowY: "scroll", height: "90%", paddingTop: "20px" }} columns={columns} dataSource={data} />;
}
export default ActorTable;