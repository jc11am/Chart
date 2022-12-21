import { useState } from "react"
import { VStack } from "@chakra-ui/layout"
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement } from "@chakra-ui/react"

const LogIn = function(){
    const [ show, setShow ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleClick = function() {
        setShow(!show)
    }

    const submitHandler = function() {

    }
    return(
        <VStack spacing="5px" color="black">
            <FormControl id="email" isRequired>
                 <FormLabel>Email</FormLabel>
                <Input type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    value={email}
                 />
            </FormControl>

            <FormControl id="password" isRequired>
                 <FormLabel>Password</FormLabel>
                 <InputGroup>
                 <Input type={ show ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                    value={password}
                 />
                 <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
                 </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                setEmail("guest@example.com");
                setPassword("123456");
                }}
            >Get Gest User Credentials</Button>
        </VStack>
    )
}

export default LogIn