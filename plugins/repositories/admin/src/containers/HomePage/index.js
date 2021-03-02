import React, { useState, useEffect, memo } from 'react';
import axios from 'axios'
import { Header } from '@buffetjs/custom';
import { Table } from '@buffetjs/core';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 18px 30px;

  p {
    margin-top: 1rem;
  }
`

const HomePage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.github.com/users/React-avancado/repos')
      .then((res) => setRows(res.data))
      .catch((e) => 
        strapi.notification.error(`Ops...github API limit exceeded, ${e}`)
      );
  }, []);

  const headers = [
    {
      name: 'Nome',
      value: 'name',
    },
    {
      name: 'Descrição',
      value: 'description'
    },
    {
      name: 'URL',
      value: 'html_url'
    }
  ];

  

  return (
    <Wrapper>
      <Header
        title={{ label: 'Repositórios React Avançado' }}
        content='Lista de repositórios do curso React Avançado'
      />
      <Table headers={headers} rows={rows} />
    </Wrapper>
  );
};

export default memo(HomePage);
