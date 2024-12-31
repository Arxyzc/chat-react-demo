import { useEffect } from "react";
import NewDM from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";
import CreateChannel from "./components/create-channel";

const ContactsContainer = () => {

    const { setDirectMessagesContacts, directMessagesContacts, channels, setChannels } = useAppStore();

    useEffect(() => {
        const getContacts = async () => {
            const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
                withCredentials: true,
            });
            if (response.data.contacts) {
                setDirectMessagesContacts(response.data.contacts);
            }
        };

        const getChannels = async () => {
            const response = await apiClient.get(GET_USER_CHANNELS_ROUTE, {
                withCredentials: true,
            });
            if (response.data.channels) {
                setChannels(response.data.channels);
            }
        };

        getContacts();
        getChannels();
    }, [setChannels, setDirectMessagesContacts]);

    return (
        <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] w-full h-full bg-gradient-to-b from-[#1A1A2E] to-[#16213E] border-2 border-[#EAEAEA]">
            <div className="pt-3">
                <Logo/>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Mensaje directo" />
                    <NewDM />
                </div>
                <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
                    <ContactList contacts={directMessagesContacts} />
                </div>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Canales" />
                    <CreateChannel />
                </div>
                <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
                    <ContactList contacts={channels} isChannel={true}/>
                </div>
            </div>
            {/* Resto del contenido */}
            <ProfileInfo />
        </div>
    );
};

export default ContactsContainer;


const Logo = () => {
    return (
        <div className="flex p-5 justify-start items-center gap-2">
            <svg
            id="custom-logo"
            width="80" // Ajusta el tamaño
            height="40"
            viewBox="0 0 80 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            {/* Primer triángulo personalizado */}
            <path
                d="M60 0H80L65 35H40L60 0Z" // Modifica los valores de d
                className="custom-part1"
                fill="#8338ec" // Cambia el color
            ></path>

            {/* Segundo triángulo personalizado */}
            <path
                d="M40 0H58L40 35H22L40 0Z"
                className="custom-part2"
                fill="#7d2181"
            ></path>

            {/* Tercer triángulo personalizado */}
            <path
                d="M20 0H38L20 35H2L20 0Z"
                className="custom-part3"
                fill="#87CEEB"
            ></path>
            </svg>
        
            {/* Texto del logo */}
            <span className="text-3xl font-semibold">CHATDEMO</span> {/* Cambia el nombre aquí */}
        </div>
    );
};

const Title = ({ text }) => {
    return (
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
            {text}
        </h6>
    );
};