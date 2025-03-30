import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../assets/trash.svg';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    try {
      const usersFromApi = await api.get('/users');
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  }

  async function createUsers() {
    try {
      await api.post('/users', {
        name: inputName.current.value,
        age: inputAge.current.value,
        email: inputEmail.current.value
      });
      getUsers();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/users/${id}`);
      getUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Novo usuário</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName} />
        <input placeholder="Idade" name='idade' type='number' ref={inputAge} />
        <input placeholder="email@example.com" name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>CADASTRAR</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} height="30px" alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
