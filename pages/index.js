import axios from "axios";
import { useState } from "react"
import Link from "next/link";


export async function getServerSideProps(context) {
  const pokemons = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=503" );
 

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
  const [type, setType] = useState([]) //-- Buscas dos tipos de pokemons
  let search = props.search.pokemon; //-- Pesquisa do usuário
  
  //-- Conversão para minusculos
  const nameLower = []
  if(search != undefined) {
    const lower = search.toLowerCase().trim();
    nameLower.push(lower)
  }

  //Verificação ERROR:-Pokemon não listado 
  let pokeNames = dex.map((value) => value.name);
  let verify = pokeNames.find((e) => e == nameLower);
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
    .then((data) => (
     setSkin(data.data.sprites.front_default),
     setType(data.data.types[0].type.name)
    ));
  }

  return (
    <>
      <div className="bg-blue-700 min-h-screen max-h-full">
        <div className="mx-auto w-[400px]">
          <div className="absolute top-[50px] h-[50px] h-[400px] w-[400px] bg-red-600 shadow-black shadow-2xl rounded-[10px]">
            <div className="absolute right-[28px] top-[64px] font-bold ">
              <p className="h-[26px] text-[25px]">P</p>
              <p className="h-[26px] text-[20px]">o</p>
              <p className="h-[26px] text-[20px]">k</p>
              <p className="h-[26px] text-[20px]">e</p>
              <p className="h-[26px] text-[20px]">d</p>
              <p className="h-[22px] text-[20px]">é</p>
              <p className="h-[26px] text-[22px]">x</p>
            </div>
            <div className=" h-[45px] flex bg-red-600 mt-[10px]">
              <span className="shadow shadow-black w-[40px] h-[40px] rounded-[30px] flex mx-auto bg-white">
                <span className="shadow shadow-blue-600 w-[30px] h-[30px] rounded-[30px] flex mx-auto mt-[5px] bg-blue-600"></span>
              </span>
              <div className="flex space-x-[5px] mr-[275px]">
                <span className=" shadow shadow-black w-[15px] h-[15px] rounded-[30px] flex mx-auto bg-red-700"></span>
                <span className=" shadow shadow-black w-[15px] h-[15px] rounded-[30px] flex mx-auto bg-yellow-400"></span>
                <span className=" shadow shadow-black w-[15px] h-[15px] rounded-[30px] flex mx-auto bg-green-600"></span>
              </div>
            </div>
            {/* Pokedex exibir: */}
            <div className="text-center w-[220px] h-[215px] px-[20px] mx-auto mt-[15px] ml-[90px] p-[10px] bg-slate-300 shadow shadow-black rounded-bl-[20px]">
              {/* Estilos Exibir lado de cima */}
              <div className="flex w-[35px] mx-auto space-x-[15px] ">
                <span className="shadow shadow-black w-[10px] h-[10px] rounded-[30px] bg-red-700 flex"></span>
                <span className="shadow shadow-black w-[10px] h-[10px] rounded-[30px] bg-red-700 flex"></span>
              </div>
              <div className="shadow shadow-black w-[180px] h-[155px] bg-gray-800 mt-[5px] rounded-[10px] p-[2px]">
                <div className="text-white">
                  {dex.map((value) => {
                    if (nameLower == value.name) {
                      return (
                        <div key={value.url}>
                          <div>
                            <p className="text-[18px] capitalize">
                              <strong>{value.name}</strong>
                            </p>
                            <div>
                              <div className="flex flex-col items-center w-[180px] h-[180px] mx-auto ml-[4px]">
                                <img
                                  src={skin}
                                  width="110px"
                                  height="110px"
                                  className="absolute bottom-[165px]"
                                />
                                <div className="mt-[100px] capitalize mr-[120px] min-w-[40px] max-w-[80px] ">
                                  <p className="text-[17px]"><strong>{type}</strong></p>
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
              {/* Estilos Exibir lado de baixo */}
              <div className="flex space-x-[140px]">
                <div className="mt-[10px]">
                  <span className="shadow shadow-black w-[15px] h-[15px] flex rounded-[30px] bg-red-600 ml-[3px]"></span>
                </div>
                <div className="space-y-[4px] mt-[8px]">
                  <span className="border border-black w-[20px] flex"></span>
                  <span className="border border-black w-[20px] flex"></span>
                  <span className="border border-black w-[20px] flex"></span>
                  <span className="border border-black w-[20px] flex"></span>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col">
                <div className="mt-[10px] mb-[5px] mr-[10px] flex">
                  <span className=" w-[40px] h-[10px] mx-auto flex bg-red-700 rounded-[30px] mr-[10px] shadow shadow-black"></span>
                  <span className=" w-[40px] h-[10px] mx-auto flex bg-blue-700 rounded-[30px] ml-[10px] shadow shadow-black"></span>
                </div>
                <div className="flex">
                  <form method="GET" className="flex mt-[4px]">
                    <button
                      type="submit"
                      className="ml-[30px] w-[60px] h-[60px] mt-[1px] rounded-[30px] bg-gray-700 shadow shadow-black"
                    ></button>
                    <input
                      autoComplete="off"
                      name="pokemon"
                      className="text-center bg-green-400 h-[40px] w-[150px] py-[30px] px-[10px] mx-auto flex ml-[30px] shadow shadow-black rounded-[8px] outline-none "
                      placeholder="Buscar..."
                      required
                    />
                  </form>
                  <div>
                    <select defaultValue={"none"} className="absolute top-[40px] left-[115px] w-[186px] text-center outline-none rounded-[5px] bg-red-600 text-[19px]">
                      <option value="none" disabled className="text-slate-200 text-[16px]">Pokelist</option>
                      {dex.map(value => {
                        return (
                          <option className="border-none text-[15px]" key={value.url}>
                          {value.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div>
                    <div className="w-[90px] h-[90px] absolute right-[15px] bottom-[20px]">
                      <div className="border-[10px] border-gray-700 w-[90px] absolute bottom-[35px] right-[8px] rounded-[30px] "></div>
                      <div className="border-[10px] border-gray-700 h-[90px] absolute right-[44px] rounded-[30px] "></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
