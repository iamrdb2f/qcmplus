import React from 'react'
import './style.css'
import l from '../../assets/logo/qcmplus_logo.png'
import { RiHomeLine } from "react-icons/ri";
import Nav from "react-bootstrap/Nav";
import {Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';





const Teachers = () => {
    return (
        <div className="bg-white">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow px-7 py-20 mx-auto w-full font-semibold bg-sky-50 max-md:px-5 max-md:mt-10">
                        <div className="mr-4 ml-4 text-4xl font-medium text-sky-500 max-md:mx-2.5">
                            <div className='content_top'>
                                <img src={l} alt="" className='logo' />
                            </div>
                        </div>
                        <div className="flex  justify-center items-start px-3  mt-24 w-full text-sm text-white whitespace-nowrap rounded bg-blue-950 max-md:pr-5 max-md:mt-10">
                            <div className="flex gap-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d84a8f952e18d642f0626b94cccdc635630a8c776740f6b3da2356697096a50?"

                                />

                                <button>Dashboard</button>

                            </div>
                        </div>
                        <div className="flex justify-center items-start px-3  mt-3 w-full text-sm text-white whitespace-nowrap rounded bg-blue-950 max-md:pr-5 max-md:mt-10">
                            <div className="flex gap-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d84a8f952e18d642f0626b94cccdc635630a8c776740f6b3da2356697096a50?"

                                />
                                <button>Teachers</button>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe59e38e42cc9b61ab116a5b94255cd0b3258cd5dca2a48335db948db00bd06a?"
                                className="shrink-0 my-auto w-1.5 border-2 border-white border-solid aspect-[0.6] stroke-[2px] stroke-white"
                            />
                        </div>
                        <div className="flex justify-center items-start px-4  mt-3 w-full text-sm text-white whitespace-nowrap rounded bg-blue-950 max-md:pr-5 max-md:mt-10">
                            <div className="flex gap-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6613376a7095a141441272a06c223026d1cc3feb7093db2c2457e4fbc7e7a268?"
                                    className="shrink-0 my-auto w-5 "
                                />
                                <button>Students/Classes</button>
                            </div>
                        </div>
                        <div className="flex justify-center items-start px-4  mt-3 w-full text-sm text-white whitespace-nowrap rounded bg-blue-950 max-md:pr-5 max-md:mt-10">
                            <div className="flex gap-4">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a348cf95a52fdf52fad63d2a11ee6191620467476e9a6f681d56c442c156847f?"
                                    className="shrink-0 my-auto w-5"
                                />
                                <button>Exams</button>
                            </div>
                        </div>
                        <div className="flex justify-center items-start px-4 mt-40  whitespace-nowrap rounded bg-blue-950 max-md:pr-5 max-md:mt-10">
                            <div className="flex gap-4 text-sm text-white">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/63f7b5a5e5d2d9139acf7a148194e787b2118d9523afe98ee52b24c6ef8879be?"
                                    className="shrink-0 my-auto w-5"
                                />
                                <button>Features</button>
                            </div>
                            <div className="justify-center px-2 py-px my-auto text-xs text-black bg-blue-200 rounded-lg">
                                NEW
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-3 justify-between self-end text-sm font-semibold text-center text-neutral-700">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/243e5536367ae6f0955f1b1574c2ed930d8a55127115f3e0f9c750c3a161e54a?"
                                className="shrink-0 w-6 aspect-square"
                            />
                            <div className="flex items-center px-4 py-3">
                                <button>Log out</button>
                            </div>
                        </div>
                        <div className="flex gap-5 justify-between py-3.5 pr-20 pl-4 mt-2 w-full text-center bg-white max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                            <div className="my-auto text-base font-medium text-neutral-600">
                                Teachers
                            </div>
                            <div className="flex gap-4 text-sm font-semibold">
                                <div className="justify-center px-3.5 py-3 text-sky-700 bg-white rounded">
                                    Export CSV
                                </div>
                                <div className="justify-center px-3.5 py-3 text-white bg-blue-400 rounded">
                                    Add Teachers
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col pl-20 mt-3.5 max-md:pl-5 max-md:max-w-full">
                            <div className="flex gap-0 mr-4 text-sm font-medium rounded-lg bg-neutral-200 max-md:flex-wrap max-md:mr-2.5">
                                <div className="flex gap-3 p-4 bg-white text-stone-300 max-md:pr-5">
                                    <div className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        Add filter


                                    </div>
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd3a84ecc5e6f5db913afeb62542ea7eea5436fa820e157807e7e8bfb64b5982?"
                                        className="shrink-0 my-auto w-2 aspect-[1.59] fill-stone-300"
                                    />
                                </div>
                                <div className="flex flex-1 gap-4 py-4 pr-5 pl-4 bg-zinc-50 text-zinc-500 max-md:flex-wrap">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c812bddaa2cb261bce79e01c6d5acfde1eb59f3600e7f381b641ea4852f061a?"
                                        className="shrink-0 self-start w-4 aspect-[1.06] fill-zinc-500"
                                    />
                                    <div className="mb-0 flex-1">
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="username" type="text" placeholder="Search for a teacher by name or email"/>

                                    </div>

                                </div>
                            </div>
                            <div className="flex flex-col px-10 py-7 mt-10 bg-zinc-50 max-md:pl-5 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                                    <div className="flex-auto self-start text-3xl font-semibold text-neutral-600">
                                        Add Teachers
                                    </div>
                                    <div className="flex flex-col text-sm font-medium whitespace-nowrap text-zinc-500">
                                        <div>Designation</div>
                                        <div className="mb-0 flex-1">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text"/>

                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-5 mt-8 max-w-full text-lg font-medium text-neutral-600 w-[275px]">
                                    <div>Manually</div>
                                    <div className="flex-auto">Import CSV</div>
                                </div>
                                <div className="mt-9 text-sm font-medium text-zinc-500 max-md:max-w-full">
                                    Full Name
                                </div>
                                <div className="mb-0 flex-1">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="username" type="text" placeholder="Enter Full Name"/>

                                </div>
                                <div className="mt-7 text-sm font-medium text-zinc-500 max-md:max-w-full">
                                    Email address
                                </div>
                                <div className="flex gap-5 w-full text-sm font-medium whitespace-nowrap text-stone-300 max-md:flex-wrap max-md:max-w-full">
                                    <div className="flex flex-auto gap-5 max-md:flex-wrap">
                                        <div className="mb-0 flex-1">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Enter Email Adress"/>

                                        </div>
                                        <div className="flex flex-auto gap-1 px-4 py-2 bg-white rounded border border-solid border-neutral-400 max-md:px-5">
                                            <div className="mb-0 flex-1">
                                                <input
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="username" type="text" placeholder="Select Options"/>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 px-4 py-2 bg-white rounded border border-solid border-neutral-400 max-md:px-5">
                                        <div>Gender</div>
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd3a84ecc5e6f5db913afeb62542ea7eea5436fa820e157807e7e8bfb64b5982?"
                                            className="shrink-0 my-auto w-2 aspect-[1.59] fill-stone-300"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 mt-7 text-sm font-medium text-zinc-500 max-md:flex-wrap">
                                    <div className="flex flex-col flex-1 grow shrink-0 whitespace-nowrap basis-0 w-fit max-md:max-w-full">
                                        <div className="max-md:max-w-full">Password</div>
                                        <div className="mb-0 flex-1">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Enter Password"/>

                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit max-md:max-w-full">
                                        <div className="max-md:max-w-full">Phone number</div>
                                        <div className="mb-0 flex-1">
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="username" type="text" placeholder="Enter Phone Number"/>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 max-md:pr-5 max-md:max-w-full">
                                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                        <div className="flex flex-col w-3/5 max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col font-medium max-md:mt-10">

                                                <div className="mb-0 flex-1">
                                                    <input
                                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                        id="username" type="text" placeholder="Subject"/>

                                                </div>
                                                <div className="flex gap-3 self-start mt-7 text-base text-neutral-600">
                                                    <img
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d07938a5d3662cd7af368b35c1397496d368f2d37512a39a2fd6ed681dbf7ab0?"
                                                        className="shrink-0 aspect-[1.32] w-[21px]"
                                                    />
                                                    <div>Add another</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
                                            <div className="flex flex-col grow text-sm font-semibold max-md:mt-10">
                                                <div className="justify-center px-3.5 py-2 text-center rounded bg-zinc-100 text-neutral-600 max-md:px-5">
                                                    <button>Add Teacher</button>
                                                </div>
                                                <div className="flex justify-content-center items-start self-end px-6 py-6 mt-6 whitespace-nowrap bg-blue-950 rounded-[30px] text-zinc-50 max-md:px-5">
                                                    <div className="flex gap-4">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b07f0ff1403331587b645fb7a9ffd3d48a7cb5d85fb7b31fec447e71661747f0?"
                                                            className="shrink-0 w-4 aspect-square"
                                                        />
                                                        <button>Support</button>
                                                    </div>
                                                    <img
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/15baa160cf173f1a90e74f0530ea1372a593d9e4409cb7b0c6d23d1c91f1e960?"
                                                        className="shrink-0 w-4 aspect-square"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teachers
