import CollectionGalleryCard from "@/components/CollectionGalleryCard";
import { setModalCollectionTo } from "@/datasources/config/local/ConfigSlice";
import { useState } from "react";
import { CgFolderAdd } from "react-icons/cg";
import { IoAdd, IoFolderSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Button from "../../Button";
import CollectionModal from "@/components/profile/Collection/CollectionModal";

const data = [
    {
        id: 1,
        title: 'مجموعه زیبایی های ایرانی اسلامی',
        is_published: true,
        total_count: 25,
        media: [
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            },
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }
        ]
    },
    {
        id: 2,
        title: 'مجموعه زیبایی های ایرانی اسلامی',
        is_published: false,
        total_count: 25,
        media: [
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            },
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }
        ]
    },
    {
        id: 3,
        title: 'مجموعه زیبایی های ایرانی اسلامی',
        is_published: true,
        total_count: 25,
        media: [
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            },
            {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }, {
                alt: "natural",
                src: "https://placeimg.com/640/480/nature/1"
            }
        ]
    },
]


const Collections = () => {
    const dispatch = useDispatch()
    return (
        <div className="container">
            <CollectionModal />
            <Button className="btn-primary rounded-2xl px-8 py-4 mt-8 mb-16" onClick={() => dispatch(setModalCollectionTo({ active: true, footage_details: {} }))}>
                <IoAdd className="text-2xl" />
                <span>ایجاد مجموعه جدید</span>
            </Button>
            <div className="grid grid-cols-3 gap-x-14">
                {data.map((collection, k) => (
                    <div className="min-h-6" key={k}>
                        <CollectionGalleryCard
                            id={collection.id}
                            items={collection.media}
                            label={collection.title}
                            editLink={'collection/edit/' + collection.id}
                            is_published={collection.is_published}
                            total_count={collection.total_count}
                            icon={<IoFolderSharp />}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collections;
