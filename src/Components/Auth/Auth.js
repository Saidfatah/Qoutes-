import React ,{useState} from 'react'
import Login from './loging'
import SignUp from './signup'
import GradiantContainer from '../Layout/GradiantBackground'
import {Flex,FlexItem,Frame,Absolute,Image} from '../Common/Styled Components/Container'
import AuthHeroQuote from './AuthHeroQuote'


const Auth=()=> {
    const [toggleAuth, settoggleAuth] = useState(true)
    
    return (
        <Frame  width="100%" height="100vh">
            <Flex>
                <FlexItem>
                    <Frame height="100%" width="100%" >
                        <GradiantContainer L9lawi="hey">
                            <Flex dir="column" justify="center" >
                                <FlexItem flex={1}>
                                     <Frame width="100%" height="100%" left="50%" transform="translateX(-50%)" position="absolute" >
                                               <Image  height="100%" width="inherit"  href="ornament image " src="/images/ornament.png"  />
                                     </Frame>
                                     <Frame width="100%" height="100%" left="50%" transform="translateX(-50%)" position="absolute" >
                                        <Flex dir="column" justify="center" >
                                                 <AuthHeroQuote />
                                        </Flex>
                                     </Frame>
                                </FlexItem>
                            </Flex>
                        </GradiantContainer>
                    </Frame>
                </FlexItem>
                <FlexItem>
                    <Frame width="100%" height="100vh" left="50%" transform="translateX(-50%)" zIndex={-1} position="absolute" >
                         <Image  height="100%" width="369px"  href="ornament image " src="/images/ornamentCirlce.png"  />
                    </Frame>
                    <Flex dir="column" justify="center">
                        {
                            toggleAuth
                            ? <Login  {...{settoggleAuth}} />
                            :<SignUp  {...{settoggleAuth}} />
                        }
                    </Flex>
                </FlexItem>
            </Flex>
        </Frame>
    )
}

export default Auth
