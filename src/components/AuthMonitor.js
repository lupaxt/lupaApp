import {Container} from "unstated";
import {graphql_server} from "../endpoints";
import {GET_USER} from "../apis/query";
import {request} from "graphql-request";
import {auth} from "./auth";

const getUser = (fibauid) => request(graphql_server, GET_USER, {fibauid})

//just for debugging

//the plural of status is stati?
const authStati = {
    signed_out: 0,
    signed_in_unverified: 1,
    signed_in_verfied: 2
};
//lifecycle events won't work here since the class is never instantiated with Unstated.
//but we still have access to it's state
export default class AuthMonitor extends Container {
    constructor() {
        super();
        this.state = {
            // auth: firebase.auth(),
            authState: authStati.signed_out,
            user: null,
            uid: null,
            idToken: sessionStorage.getItem("lupa_token"),
            lupa_user: JSON.parse(sessionStorage.getItem("lupa_user"))
        };
        const that = this
        setInterval(() => that.state.user ? that.getIdToken(that.state.user) : null, 12 * 60 * 1000)
        auth.onAuthStateChanged(async user => {
            if (!user || user.uid === this.state.uid) {
                return
            }
            if (user) {
                // console.log("user", user, "user");
                const idToken = await this.getIdToken(user)
                const lupa_user = await this.getUser(user.uid)

                this.setState({
                    user, idToken, lupa_user, user, uid: user.uid,
                    authState: (user.emailVerified
                        ? authStati.signed_in_verfied
                        : authStati.signed_in_unverified)
                })

                if (this.state.authState < 1) {
                    sessionStorage.clear();
                }

            } else {
                this.setState({authState: authStati.signed_out});
            }


        })
    }

    async getUser(uid) {
        const {user} = await getUser(uid);
        // console.log("luparillo", user);
        sessionStorage.setItem("lupa_user", JSON.stringify(user))
        return user
    }

    async getIdToken(user) {
        const idToken = await user.getIdToken();
        sessionStorage.setItem("lupa_token", idToken)

        return idToken

    }
}

/* export default function AuthMonitor () {
  const [authStatus, setAuthStatus] = useState(authStati.signed_out)

  useEffect(() => {

  })
  return null
} */
