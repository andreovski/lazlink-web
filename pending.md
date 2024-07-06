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

- Adicionar o campo ```externalLinks```, ```whatsappPhone```
  ```ts
    interface IExternalLinks {
      label: string;
      link: string;
    }
  ```
- Remover a obrigatoriedade dos campos ```scheludeCount```e ```indicatedBy```.
- Adicionar o campo ```complement``` drento de ```Address```
  ```ts
  interface IAddress {
    state: string;
    city: string;
    postalCode: string;
    street: string;
    number: string;
    locality: string;
    complement: string | null;
  }
  ```
- _Discutir sobre qual a finalidade do campo ```scheduleCount``` e ```scheduleOptions```_.
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
      advancePayment: boolean;
    }

  ```
- Ter um endpoint para mudança da ordenação dos serviços. 
  _[Discutir como pode ser feito]_

**Endpoints**

- Endpoint que busque os dados **não sensiveis** do profissional pelo username. O username será contido na url do profissional.
- Endpoint que traga os dados do profissional pelo googleId, visto que a autenticação será feito pelo googleId. 
- Endpoint que faça a atualização do campo ```externalLinks``` do profissional.


