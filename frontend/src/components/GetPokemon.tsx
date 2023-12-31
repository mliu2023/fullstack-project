import { useState, useEffect } from "react";
import { Button, Input, HStack } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import axios from "axios";

interface Props {
    loadPokemon: Function;
}
const GetPokemon = ({ loadPokemon }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        loadPokemon();
    }, [isLoading])

    function handleSubmit(e: any) {
        // Block the default form handler behavior.
        e.preventDefault();

        // Set isLoading to true while we make the API request.
        setIsLoading(true);

        getPokemon(e.target.name.value)
    }

    function getPokemon(name: string) {
        console.log(name);
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
            .then(res => {
                console.log(res.data);
                axios
                    .post("http://localhost:8080/pokemon", {
                        name: res.data.name,
                        image: res.data.sprites.front_default,
                        stats: res.data.stats,
                        types: res.data.types,
                    })
                    .then((response) => {
                        // handle success
                        console.log(response);
                    })
                    .catch((error) => {
                        // handle error
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error)
            })
            .then(() => {
                setIsLoading(false);
            });
    }

    return (
    <form onSubmit={handleSubmit}>
        <HStack>
            <Input required name="name" placeholder="pokemon name" />
            <Button colorScheme="teal" type="submit" isLoading={isLoading}>
                <SearchIcon />
            </Button>
        </HStack>
    </form>
    );
};

export default GetPokemon;
