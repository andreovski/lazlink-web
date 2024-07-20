## Screens
- Landing page

## Create account
- Add new field 'Indicação'


## BACK-END

**Na tabela USER, fazer a seguinte alteraçoes**

**Na tabela PROFESSIONAL**

- Campo `avatarUrl` não está sendo setado o valor passado
- _Discutir sobre qual a finalidade do campo `scheduleCount`_.
- _Revisar `SCHEDULE_OPTIONS` do profissional_.
- _Revisar `recommendations` do profissional_.
- _Diferença entre `avatarUrl`e `ìmageUrl` ?_

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
- Endpoint que traga os dados do profissional pelo `googleId`, visto que a autenticação será feito pelo googleId.
- Endpoint que faça a atualização do campo `externalLinks` do profissional.
- Endpoint para validar a disponibilidade do username escolhido

- Verificar como será feito o upload de imagens

