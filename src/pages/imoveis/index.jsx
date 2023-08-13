import { useEffect, useState, useMemo } from 'react';
import CardImoveis from '../../components/cardImoveis';
import Header from '../../components/header';
import useUser from '../../hooks/useUser';
import './style.scss';
import banner from '../../assets/banner.png'
import Select from "react-dropdown-select";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Imoveis() {
    const { token } = useUser();
    const [imoveis, setImoveis] = useState([]);
    const [seeInMapVisible, setSeeInMapVisible] = useState(false);
    const [addressCoordinates, setAddressCoordinates] = useState();
    const [imoveisFiltrados, setImoveisFiltrados] = useState([]);

    const [selectedTipo, setSelectedTipo] = useState(null);
    const [selectedValorMin, setSelectedValorMin] = useState(null);
    const [selectedValorMax, setSelectedValorMax] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDSW_aGdER_J2cQzoaF4TVOUq0H2Td4NCE',
    });

    async function handleSeeInMap(visible, address){
        address = address.replace(/ /g, '+');
        console.log('Endereço Após Formatar -> ' + address)
        let result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDSW_aGdER_J2cQzoaF4TVOUq0H2Td4NCE`)
        result = await result.json();
        setAddressCoordinates([result.results[0].geometry.location.lat, result.results[0].geometry.location.lng])
        setSeeInMapVisible(visible);
    }

    const filterImoveis = () => {
        if (!selectedTipo && !selectedValorMin && !selectedValorMax) {
            setImoveisFiltrados(null);
            return;
        }

        let filteredImoveis = imoveis;
    
        if (selectedTipo) {
            filteredImoveis = filteredImoveis.filter(imovel => imovel.tipo === selectedTipo);
        }
    
        if (selectedValorMin) {
            filteredImoveis = filteredImoveis.filter(imovel => parseFloat(imovel.valor_de_venda.replace(/[^0-9,]/g, '').replace(',', '.')) >= selectedValorMin);
        }
    
        if (selectedValorMax) {
            filteredImoveis = filteredImoveis.filter(imovel => parseFloat(imovel.valor_de_venda.replace(/[^0-9,]/g, '').replace(',', '.')) <= selectedValorMax);
        }

        setImoveisFiltrados(filteredImoveis);
    };

    useEffect(() => {

        async function getImoveis() {

            try {
                const response = await fetch('http://localhost:3000/imoveis', {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setImoveis(data.success);
            } catch (error) {
                console.log(error.message);
            }
        }

        getImoveis();
    }, [])

    useEffect(() => {
        filterImoveis();
    }, [selectedTipo, selectedValorMax, selectedValorMin])

    return (
        <div className='imoveis-page'>
            <Header actualPage={'imoveis'}/>
            <div className='w-full h-[30em]'>
                <img src={banner} alt='banner' className='h-full w-full'></img>
                <div className="flex flex-col absolute inset-y-[10em] h-[30em] w-full bg-[#00000050] justify-center">
                    <span className='text-white font-normal text-5xl ml-[3em] mb-2'>Aqui seus sonhos</span>
                    <span className='text-white font-normal text-5xl ml-[3em]'>ganham um novo lar</span>
                </div>
            </div>
            
            <div className='w-full h-auto flex justify-center mt-[-5em] z-10'>
                <div className='w-auto h-auto mr-[6em] drop-shadow-xl'>
                    <span className='font-bold text-white text-xl'>Tipo do Imóvel</span>
                    <div className='w-[20em]'>
                        <Select
                                color='#ED5B2D'
                                clearable={true}
                                searchable={false} 
                                placeholder='Selecione' 
                                className='h-[3.5em] text-xl bg-white rounded-sm' 
                                options={
                                    [
                                        {value: 'Apartamento', label: "Apartamento"},
                                        {value: 'Lote', label: "Lote"}
                                    ]
                                } 
                                onChange={(selectedOptions) => {selectedOptions[0] ? setSelectedTipo(selectedOptions[0].value) : setSelectedTipo(null);}}/>
                    </div>
                    {/*
                    <div className='bg-white px-[8em] py-[2em] rounded-sm'>
                        <Select searchable={false} placeholder='Selecione' className='text-xl bg-white rounded-sm' options={[{value: 1, label: "Apartamento"}, {value: 2, label: "Lote"}]} onChange={(value) => {console.log(value)}}/>
                    </div>
                    */}
                </div>
                <div className='w-auto h-auto mr-[6em] drop-shadow-xl'>
                    <span className='font-bold text-white text-xl'>Valor Mínimo</span>
                    <div className='w-[20em]'>
                        <Select 
                            color='#ED5B2D'
                            clearable={true}
                            searchable={false} 
                            placeholder='Selecione' 
                            className='h-[3.5em] text-xl bg-white rounded-sm' 
                            options={
                                [   
                                    {value: 100000, label: "R$100.000,00"},
                                    {value: 200000, label: "R$200.000,00"},
                                    {value: 300000, label: "R$300.000,00"},
                                    {value: 400000, label: "R$400.000,00"},
                                    {value: 500000, label: "R$500.000,00"},
                                    {value: 1000000, label: "R$1.000.000,00"},
                                    {value: 10000000, label: "R$10.000.000,00"},
                                    {value: 100000000, label: "R$100.000.000,00"},
                                ]
                            } 
                            onChange={(selectedOptions) => {selectedOptions[0] ? setSelectedValorMin(selectedOptions[0].value) : setSelectedValorMin(null);}}/>
                    </div>
                </div>
                <div className='w-auto h-auto drop-shadow-xl'>
                    <span className='font-bold text-white text-xl'>Valor Máximo</span>
                    <div className='w-[20em]'>
                        <Select 
                            color='#ED5B2D'
                            clearable={true}
                            searchable={false} 
                            placeholder='Selecione' 
                            className='h-[3.5em] text-xl bg-white rounded-sm' 
                            options={
                                [
                                    {value: 100000, label: "R$100.000,00"},
                                    {value: 200000, label: "R$200.000,00"},
                                    {value: 300000, label: "R$300.000,00"},
                                    {value: 400000, label: "R$400.000,00"},
                                    {value: 500000, label: "R$500.000,00"},
                                    {value: 1000000, label: "R$1.000.000,00"},
                                    {value: 10000000, label: "R$10.000.000,00"},
                                    {value: 100000000, label: "R$100.000.000,00"},
                                ]
                            } 
                            onChange={(selectedOptions) => {selectedOptions[0] ? setSelectedValorMax(selectedOptions[0].value) : setSelectedValorMax(null);}}/>    
                    </div>
                </div>
            </div>
            
            <div className='imoveis-container mt-[2em] flex justify-center' >
                {imoveisFiltrados && imoveisFiltrados.map(imovel => {
                    return (
                        <CardImoveis
                            key={imovel.id}
                            id={imovel.id}
                            tipo={imovel.tipo}
                            endereco={imovel.endereco}
                            valorDaVenda={imovel.valor_de_venda}
                            foto={imovel.url_da_foto}
                            seeInMap={handleSeeInMap}
                        />
                    )
                })}
                {imoveis && !selectedTipo && !selectedValorMax && !selectedValorMin && imoveis.map(imovel => {
                    return (
                        <CardImoveis
                            key={imovel.id}
                            id={imovel.id}
                            tipo={imovel.tipo}
                            endereco={imovel.endereco}
                            valorDaVenda={imovel.valor_de_venda}
                            foto={imovel.url_da_foto}
                            seeInMap={handleSeeInMap}
                        />
                    )
                })}
            </div>
            {seeInMapVisible && 
                <div className="z-[60] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
                    <div className="ml-[10em] mr-[10em] bg-white p-9 pt-4 rounded-xl shadow-lg w-full h-[70%]">
                        <div className='h-[90%]'>
                            <GoogleMap zoom={15} center={{lat: addressCoordinates[0], lng: addressCoordinates[1]}} mapContainerClassName="w-full h-full">
                                <Marker position={{lat: addressCoordinates[0], lng: addressCoordinates[1]}}/>
                            </GoogleMap>
                        </div>
                        <div className='h-[10%] px-[10em]'>
                            <button onClick={() => setSeeInMapVisible(false)} className='hover:scale-105 duration-300 bg-[#FF4D00] w-full py-[0.5em] mt-[1em] rounded-2xl text-white text-2xl font-bold'>Voltar</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Imoveis;