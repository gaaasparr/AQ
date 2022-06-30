import React, {Component} from "react";
import './Login.css'
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";

const baseUrl = "http://localhost:3001/users"
const cookies = new Cookies();


class Login extends Component {
    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange=(e)=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
        .then(response=>{
            console.log(response.data)
            return response.data;
        })
        .then(response=>{

            if(response.length>0){
                const filtro = response.findIndex(user => user.password === this.state.form.password && user.username === this.state.form.username);
                console.log(filtro)
                if(filtro === -1){
                    alert('El usuario o la contraseña no son correctos')
                } else {
                    cookies.set('id', response[filtro].id, {path: '/'})
                    cookies.set('username', response[filtro].username, {path: '/'})
                    alert(`Bienvenido ${response[filtro].username}`);
                    window.location.href='./home';
                }}
            }
                )
            


            // if(response.length>0){
            //     console.log(response);
            //     var respuesta=response[0];
            //     cookies.set('id', respuesta.id, {path: "/"});
            //     cookies.set('nombre', respuesta.nombre, {path: "/"});
            //     cookies.set('username', respuesta.username, {path: "/"});
            //     alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
            //     //window.location.href="./Home";
            // }else{
            //     alert('El usuario o la contraseña no son correctos');
            // }
        
        .catch(error=>{
            console.log(error);
        })

    }

   componentDidMount() {
       if(cookies.get('username')){
          window.location.href="./home";
       }
       console.log(cookies.get('username'))
   }
    //ciclo de vida viejo: componentDidMount(), componentDidUpdate(), componentWillUnmount(), ahora se usa useEffect

    render() {
        return (
    <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
          <div>Welcome to GasparLibre.com</div>
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
        );
    }
}

export default Login;