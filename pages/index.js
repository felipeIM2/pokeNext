import axios from "axios";
import { useState } from "react";


export async function getServerSideProps(context) {
  const pokemons = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=950"
  );

  return {
    props: {
      pokemons: pokemons.data,
      search: context.query,
    },
  };
}

export default function Index(props) {
  const [dex, setDex] = useState(props.pokemons.results);
  let search = props.search.pokemon;
  
  //Verificação

   let pokeNames = dex.map((value) => value.name);
  // let verify = pokeNames.find((e) => e == search);
  // if (search != undefined && verify == undefined) {
  // }

  //Revisão da pesquisa
  let nameLower = []
  if(search != undefined) {
    const lower = search.toLowerCase();
    nameLower.push(lower)
  }

  //Procura da skin do pokemon
  dex.map((value) => {
    if (value.name == nameLower) {
      async function call() {
        await axios
          .get(value.url)
          .then((data) => (
            setSkin(data.data.sprites.front_default)
          ));
      }
      call();
    }
  });
  let [skin, setSkin] = useState([]);

	

  return (
    <>
      <div className="bg-blue-700 min-h-screen max-h-full">
        <div className="mx-auto w-[400px]">
          <div className="absolute top-[50px] h-[50px] h-[400px] w-[400px] bg-red-600 shadow-black shadow-2xl rounded-[10px]">
            <h1 className="absolute left-[165px] text-[18px] top-[38px]">
              <strong>Pokedéx</strong>
            </h1>
            <div className=" h-[45px] flex bg-red-600 mt-[10px]">
              <span className="shadow shadow-black w-[40px] h-[40px] rounded-[30px] flex mx-auto bg-white">
                <span className="shadow shadow-blue-600 w-[30px] h-[30px] rounded-[30px] flex mx-auto mt-[5px] bg-blue-600"></span>
              </span>
              <div className="flex space-x-[5px] mr-[300px]">
                <span className=" shadow shadow-black w-[15px] h-[15px] rounded-[30px] flex mx-auto bg-red-700"></span>
                <span className=" shadow shadow-black w-[15px] h-[15px] rounded-[30px] flex mx-auto bg-yellow-400"></span>
                <span className=" shadow shadow-black w-[15px] h-[15px] rounded-[30px] flex mx-auto bg-green-600"></span>
              </div>
            </div>
            {/* Pokedex exibir: */}
            <div className="text-center w-[220px] h-[210px] px-[20px] mx-auto mt-[15px] ml-[90px] p-[10px] bg-slate-300 shadow shadow-black rounded-bl-[20px]">
              {/* Estilos Exibir lado de cima */}
              <div className="flex w-[35px] mx-auto space-x-[15px] ">
                <span className="shadow shadow-black w-[10px] h-[10px] rounded-[30px] bg-red-700 flex"></span>
                <span className="shadow shadow-black w-[10px] h-[10px] rounded-[30px] bg-red-700 flex"></span>
              </div>
              <div className="shadow shadow-black h-[150px] bg-gray-800 mt-[5px] rounded-[10px] p-[2px]">
                <div className="text-white">
                  {dex.map((value) => {
                    if (nameLower == value.name) {
                      return (
                        <div key={value.url}>
                          <div>
                            <p className="text-[20px] capitalize">
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
                <div className="mt-[10px] mb-[5px] mr-[55px] flex">
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
                    <select name="pokemon" className="absolute bottom-[310px] right-[4px] w-[80px] text-center outline-none rounded-[5px] bg-red-600 text-[17px]">
                      <option disabled="on" selected="on" className="text-slate-400 text-[18px]">Pokelist...</option>
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
                    <div className="w-[90px] h-[90px] absolute right-[25px] bottom-[20px]">
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
