# Testes - Jogo da Velha

Este documento descreve a estratégia de testes implementada para o jogo da velha.

## Configuração

### Dependências Instaladas
- `@testing-library/react`: Biblioteca principal para testar componentes React
- `@testing-library/jest-dom`: Matchers adicionais para Jest/Vitest
- `@testing-library/user-event`: Simulação de eventos do usuário
- `jsdom`: Ambiente DOM para testes

### Configuração do Vitest
- Configurado no `vite.config.js`
- Ambiente jsdom para simular o DOM
- Setup automático com `@testing-library/jest-dom`

## Estrutura de Testes

### 1. Testes de Componentes Individuais

#### `Square.test.jsx`
Testa o componente Square individualmente:
- Renderização com valores vazios, X e O
- Funcionamento do evento de clique
- Classes CSS corretas
- Interatividade

#### `Modal.test.jsx`
Testa o componente Modal:
- Renderização condicional (isOpen)
- Funcionamento do botão de fechar
- Renderização de children
- Classes CSS

#### `Board.test.jsx`
Testa o componente Board com mocks:
- Renderização de 9 quadrados
- Lógica de alternância X/O
- Detecção de vitória
- Exibição do modal de vencedor
- Prevenção de jogadas inválidas

#### `App.test.jsx`
Testa o componente principal Game:
- Renderização da estrutura do jogo
- Estado inicial correto
- Botões de histórico

### 2. Testes de Integração

#### `integration.test.jsx`
Testa o fluxo completo do jogo:
- Jogadas sequenciais X e O
- Prevenção de jogadas em quadrados ocupados
- Detecção de vitória para ambos os jogadores
- Funcionamento do modal de vencedor
- Manutenção do estado do jogo

## Scripts de Teste

```bash
# Executar testes em modo watch
npm test

# Executar testes uma vez
npm run test:run

# Executar testes com interface gráfica
npm run test:ui

# Executar testes com cobertura
npm run test:coverage
```

## Estratégia de Testes

### 1. Testes Unitários
- **Componentes isolados**: Cada componente testado individualmente
- **Props e eventos**: Verificação de props recebidas e eventos disparados
- **Renderização**: Confirmação de que elementos são renderizados corretamente

### 2. Testes de Integração
- **Fluxo completo**: Testa a interação entre componentes
- **Lógica de negócio**: Verifica as regras do jogo
- **Estado da aplicação**: Confirma que o estado é mantido corretamente

### 3. Mocks Utilizados
- **Modal**: Mockado para facilitar testes de vitória
- **Board**: Mockado em testes do Game para isolar responsabilidades

## Cobertura de Testes

### Funcionalidades Testadas

#### ✅ Componente Square
- Renderização com diferentes valores
- Eventos de clique
- Classes CSS

#### ✅ Componente Modal
- Renderização condicional
- Botão de fechar
- Children rendering

#### ✅ Componente Board
- Renderização do tabuleiro
- Lógica de jogadas
- Detecção de vitória
- Exibição do modal

#### ✅ Componente Game
- Estrutura da aplicação
- Estado inicial
- Botões de histórico

#### ✅ Integração
- Fluxo completo do jogo
- Regras de vitória
- Prevenção de jogadas inválidas
- Modal de vencedor

## Boas Práticas Implementadas

### 1. Testes Acessíveis
- Uso de `getByRole` para elementos interativos
- Testes baseados em comportamento, não implementação

### 2. Testes Isolados
- Cada teste é independente
- Setup e cleanup adequados
- Mocks para dependências externas

### 3. Testes Descritivos
- Nomes de testes claros e descritivos
- Organização em grupos lógicos
- Comentários explicativos quando necessário

### 4. Testes de Usuário
- Foco no comportamento do usuário
- Testes de interação realista
- Verificação de feedback visual

## Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar testes**:
   ```bash
   npm test
   ```

3. **Ver cobertura**:
   ```bash
   npm run test:coverage
   ```

## Exemplo de Teste

```jsx
it('should call onSquareClick when clicked', () => {
  const mockClick = vi.fn()
  render(<Square value={null} onSquareClick={mockClick} />)
  
  const button = screen.getByRole('button')
  fireEvent.click(button)
  
  expect(mockClick).toHaveBeenCalledTimes(1)
})
```

## Benefícios dos Testes

1. **Confiança**: Garantia de que funcionalidades funcionam corretamente
2. **Refatoração**: Segurança para fazer mudanças no código
3. **Documentação**: Testes servem como documentação do comportamento
4. **Qualidade**: Detecção precoce de bugs
5. **Manutenibilidade**: Facilita manutenção e evolução do código 