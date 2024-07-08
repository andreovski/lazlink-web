## Screens
- Landing page

## Create account
- Add new field 'Indicação'


## BACK-END

**Na tabela USER, fazer a seguinte alteraçoes**

- Manter apenas os campos ```name```, ```cellphone```, ```whatsappPhone``` e ```email``` ou retirar a obrigatoriedade do campo ```googleId```, visto que no momento do agendamento, o usuário final irá prencher apenas os campos base. 

- Remover o campo ```externalLinks``` e adiciona-los na tabela ```PROFESSIONAL```

- Adicionar o campo ```whatsappPhone```

**Na tabela PROFESSIONAL, fazer a seguinte alteraçoes**
  [IProfessional](https://github.com/andreovski/lazlink-web/blob/dev/src/api/professional/professional.d.ts)

- Adicionar o campo ```externalLinks```, ```whatsappPhone```, ```enterpriseName```, ```useEnterpriseName``` e ```instagramUrl```.
  ```ts
    interface IExternalLinks {
      label: string;
      link: string;
    }
  ```
- Remover a obrigatoriedade dos campos ```scheludeCount```e ```indicatedBy```.
- Campo ```avatarUrl``` não está sendo setado o valor passado
- Adicionar o campo ```complement``` drento de ```Address```
  ```ts
  interface IAddress {
    state: string;
    city: string;
    postalCode: string;
    street: string;
    number: string;
    locality: string;
    // ADD
    complement: string | null;
  }
  ```
- _Discutir sobre qual a finalidade do campo ```scheduleCount```_.
- _Revisar ```SCHEDULE_OPTIONS``` do profissional_.
- _Revisar ```recommendations``` do profissional_.
- _Diferença entre ```avatarUrl```e ```ìmageUrl``` ?_

**Criar a table SERVICE que será vinculado ao PROFESSIONAL**
- Criar os endpoints de CRUD para o service.
  ```ts
    interface IService {
      _id: string;
      title: string;
      description: string;
      serviceTime: string;
      value: string;
      // ADD
      advancePayment: boolean;
    }

  ```
- Ter um endpoint para mudança da ordenação dos serviços. 
  _[Discutir como pode ser feito]_

**Discutir sobre a tabela SCHEDULE**


**Endpoints**

- Endpoint que busque os dados **não sensiveis** do profissional pelo username. O username será contido na url do profissional.
- Endpoint que traga os dados do profissional pelo ```googleId```, visto que a autenticação será feito pelo googleId. 
- Endpoint que faça a atualização do campo ```externalLinks``` do profissional.
- Endpoint para validar a disponibilidade do username escolhido

**⚠️ Algumas Observações**
- Paginação no retorno de listagens. Hoje vem na estrutura de 
  ```ts 
    data: [],
    total: 0,
  ```
    Porém , como sugestão, seria melhor conter todas as propriedades de paginação.
    ```ts 
        data: [];
        count: number; // Total de itens da página atual
        page: number; // página
        totalCount: number; // Total de itens
        totalPages: number; // Total de páginas
    ```
- Verificar como será feito o upload de imagens


