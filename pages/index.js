import axios from "axios";
import { useEffect, useState } from "react"
import Link from "next/link";
import Image from "next/image";


export async function getServerSideProps(context) {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=800");

  return {
    props: {
      pokemons: pokemons.data,
      search: context.query,
    },
  };
}

export default function Index(props) {

  const [dex, setDex] = useState(props.pokemons.results); //-- Dados de todos os pokemons
  const [skin, setSkin] = useState([]); //-- Busca das skins dos pokemons
  const [type, setType] = useState([]); //-- Buscas dos tipos de pokemons
  const [loading, setLoading] = useState(true); //-- loading pagina
  let search = props.search.pokemon; //-- Pesquisa do usuário

  //-- Conversão para minusculos
  const nameLower = []
  if(search != undefined) {
    const lower = search.toLowerCase().trim();
    nameLower.push(lower)
  }

  let pokeNames = dex.map((value) => value.name); //-- Lista dos pokemons da API
  let verify = pokeNames.find((value) => value == nameLower); //-- Comparação dos pokemons com o envio da pesquisa

  //-- Verificação de loading
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }, []);
  // if(loading) {
  //   return (
  //     <>
  //       <div>
  //         <p>Carregando...</p>
  //       </div>
  //     </>
  //   )
  // }

  //-- Verificação ERROR:-Pokemon não listado 
  if (search != undefined && verify == undefined) {
    return (
      <>
        <div className="flex bg-blue-700 min-h-screen max-h-full">
          <div className="bg-red-500 w-[450px] h-[300px] mx-auto mt-[80px] p-[10px] rounded-[30px] shadow-black shadow-2xl">
            <div className="flex flex-col items-center mt-[40px] mt-[80px]">
              <h1 className="text-[20px] mb-[10px]">Pokemon: <strong>{search}</strong> não encontrado!</h1>
              <p className="text-[14px] mb-[20px]">clique no botão abaixo para retornar!</p>
              <Link href="/">
                <button 
                  type="submit" 
                  className="text-[14px] bg-yellow-400 w-[85px] h-[25px] rounded-[4px] text-blue-700 duration-[.4s] shadow shadow-black"
                >
                 <strong>POKEDÉX</strong>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  //-- Procura da skin do pokemon
  let pokeURL = []
  dex.map((value) => {
    if (value.name === nameLower[0]) {
      pokeURL.push(value.url)
      call();
      }
  });
  async function call() {
    await axios.get(pokeURL[0])
    .then( (data) => (
      setSkin(data.data.sprites.front_default),
      setType(data.data.types[0].type.name)
    ));
  }
  //-- Retorno do <Image>
  const myImage = () => {
    return skin
  }

  return (
    <>
      <div className="bg-blue-600 min-h-screen max-h-full">
        <div className="flex">
          <div className=" h-[300px] w-[300px] mx-auto mt-[90px] ">
            <div className="bg-red-600 h-full w-full shadow-black shadow-2xl rounded-[10px] p-[2px]">
              <nav className=" h-[35px]">
                <div>
                  <div className="flex">
                    <div className="ml-[5px] mt-[2px] mr-[6px]">
                      <span className="block border-[4px] border-white w-[28px] h-[28px] rounded-[30px] m-0 shadow shadow-black ">
                        <span className="block bg-blue-600 w-[20px] h-[20px] rounded-[30px] shadow shadow-black"></span>
                      </span>
                    </div>
                    <div className="flex space-x-[2px] mt-[4px]">
                      <span className="w-[12px] h-[12px] rounded-[30px] bg-red-600 shadow shadow-black"></span>
                      <span className="w-[12px] h-[12px] rounded-[30px] bg-yellow-400 shadow shadow-black"></span>
                      <span className="w-[12px] h-[12px] rounded-[30px] bg-green-500 shadow shadow-black"></span>
                    </div>
                  </div>
                </div>  
              </nav>
              <main className="flex h-[205px]">
               <section className=" h-full w-full">
                <div className="mt-[5px]">
                  <select defaultValue={"none"} className="flex w-[120px] ml-[95px] text-center outline-none bg-red-600 text-[14px] mx-auto">
                    <option value="none" disabled className="text-slate-200 text-[15px]">Pokelist</option>
                    {dex.map(value => {
                      return (
                        <option className="border-none text-[14px] capitalize" key={value.url}>
                         {value.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-[150px] h-[150px] bg-gray-200 mr-[38px] mx-auto mt-[7px] p-[2px] rounded-bl-[12px] shadow shadow-black">
                  <div className="flex space-x-[6px] mx-auto mb-[4px] mt-[10px]">
                    <span className="w-[5px] h-[5px] bg-red-700 rounded-[30px] shadow shadow-black"></span>
                    <span className="w-[5px] h-[5px] bg-red-700 rounded-[30px] shadow shadow-black"></span>
                  </div>
                  <div className="bg-gray-700 w-[115px] h-[105px] mx-auto shadow shadow-black rounded-[10px]">
                    <div className="text-white">
                      {dex.map((value) => {
                        if (nameLower == value.name) {
                          return (
                            <div key={value.url}>
                              <div>
                                <p className="text-[13px] capitalize text-center mb-[4px]">
                                  <strong>{value.name}</strong>
                                </p>
                                <div>
                                  <div className="flex flex-col w-[75px] h-[75px] mt-[-10px] mx-auto">
                                    <div className="shadow hover:shadow-black duration-[.4s] rounded-[10px] m-[4px] p-[2px] ">
                                      <Image
                                        loader={myImage}
                                        src="skin"
                                        alt=""
                                        width="70px"
                                        height="70px"
                                        className="hover:scale-[1.1] duration-[.4s]"
                                      />
                                    </div>
                                    <div className="capitalize min-w-[20px] max-w-[40px] mt-[2px] mb-[1px] ">
                                      <p className="text-[13px] mt-[-8px] ml-[-15px]"><strong>{type}</strong></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div className="flex mt-[6px] ml-[16px]">
                    <span className="bg-red-600 w-[10px] h-[10px] rounded-[30px] shadow shadow-black"></span>
                    <div className="flex flex-col space-y-[2px] ml-[88px]">
                      <span className="bg-black w-[10px] h-[1px]"></span>
                      <span className="bg-black w-[10px] h-[1px]"></span>
                      <span className="bg-black w-[10px] h-[1px]"></span>
                      <span className="bg-black w-[10px] h-[1px]"></span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-[6px] w-[100px] mx-auto mt-[10px] ml-[105px]">
                    <span className=" w-[40px] h-[8px] rounded-[30px] shadow shadow-black bg-red-800"></span>
                    <span className=" w-[40px] h-[8px] rounded-[30px] shadow shadow-black bg-blue-700"></span>
                  </div>
                </div>
                </section>
                <aside className=" h-full w-[40px] text-center">
                  <div className="mt-[8px] mr-[14px] text-[17px]">
                    <p><strong  >P<br/>O<br/>K<br/>E<br/>D<br/>É<br/>X</strong></p>
                  </div>
                </aside>
              </main>
              <footer className="">
                 <div>
                  <div className="flex">
                    <form method="GET" className="flex mt-[5px]">
                        <button
                          type="submit"
                          className=" w-[40px] h-[40px] rounded-[30px] bg-gray-700 shadow shadow-black ml-[25px] mt-[-3px]">
                        </button>
                        <input
                          autoComplete="off"
                          name="pokemon"
                          className="text-center bg-green-400 mx-auto flex shadow shadow-black rounded-[8px] outline-none text-[13px] w-[120px] h-[35px] ml-[25px] p-[15px]"
                          placeholder="Buscar..."
                          required
                        />
                    </form>
                    <div className="flex ml-[40px] mt-[14px] w-[40px] h-[40px]">
                      <span className="absolute mt-[-22px] w-[15px] h-[60px] bg-slate-700 rounded-[20px] "></span>
                      <span className="absolute ml-[-22px] w-[60px] h-[15px] bg-slate-700 rounded-[20px] "></span>
                    </div>

                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
