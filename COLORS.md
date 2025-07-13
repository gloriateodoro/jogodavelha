# Sistema de Cores - Jogo da Velha

Estedocumento descreve o sistema de cores padronizado usado na aplicação.

## Variáveis de Cores

### Cores Principais
- `--color-primary`: #667eea (Azul principal)
- `--color-primary-dark`: #4c63d2 (Azul escuro)
- `--color-primary-light`: #764ba2 (Azul claro)

### Cores Secundárias
- `--color-secondary`: #10b981 (Verde - usado para "Go to game start")
- `--color-secondary-dark`: #059669 (Verde escuro)
- `--color-secondary-light`: #34d399 (Verde claro)

### Cores de Destaque
- `--color-accent`: #3b82f6 (Azul de destaque - usado para botões)
- `--color-accent-dark`: #2563eb (Azul de destaque escuro)
- `--color-accent-light`: #60a5fa (Azul de destaque claro)

### Cores de Status
- `--color-success`: #10b981 (Verde - usado para vitória)
- `--color-success-dark`: #059669 (Verde escuro)
- `--color-warning`: #f59e0b (Amarelo - para avisos)
- `--color-warning-dark`: #d97706 (Amarelo escuro)
- `--color-error`: #ef4444 (Vermelho - para erros)
- `--color-error-dark`: #dc2626 (Vermelho escuro)

### Cores de Texto
- `--color-text-primary`: #1f2937 (Texto principal)
- `--color-text-secondary`: #6b7280 (Texto secundário)
- `--color-text-light`: #ffffff (Texto claro)
- `--color-text-muted`: #9ca3af (Texto atenuado)

### Cores de Fundo
- `--color-bg-primary`: #ffffff (Fundo principal)
- `--color-bg-secondary`: #f9fafb (Fundo secundário)
- `--color-bg-dark`: #1f2937 (Fundo escuro)
- `--color-bg-overlay`: rgba(0, 0, 0, 0.75) (Overlay do modal)

### Cores de Borda
- `--color-border`: #d1d5db (Borda padrão)
- `--color-border-light`: #e5e7eb (Borda clara)
- `--color-border-dark`: #9ca3af (Borda escura)

### Cores de Sombra
- `--color-shadow`: rgba(0, 0, 0, 0.2) (Sombra padrão)
- `--color-shadow-light`: rgba(0, 0, 0, 0.1) (Sombra clara)
- `--color-shadow-primary`: rgba(102, 126, 234, 0.4) (Sombra primária)

## Como Usar

### Em CSS
```css
.minha-classe {
  background-color: var(--color-primary);
  color: var(--color-text-light);
  border: 1px solid var(--color-border);
}
```

### Em JavaScript/JSX
```jsx
<div style={{ backgroundColor: 'var(--color-accent)' }}>
  Conteúdo
</div>
```

### Exemplos de Uso

1. **Botões principais**: `var(--color-accent)`
2. **Botões de sucesso**: `var(--color-secondary)`
3. **Mensagens de vitória**: `var(--color-success)`
4. **Textos principais**: `var(--color-text-primary)`
5. **Fundos de modal**: `var(--color-bg-overlay)`

## Tema Escuro

O sistema automaticamente se adapta ao tema escuro do sistema operacional, alterando as variáveis de cores apropriadas.

## Benefícios

1. **Consistência**: Todas as cores seguem um padrão
2. **Manutenibilidade**: Mudanças de cor centralizadas
3. **Acessibilidade**: Contraste adequado entre cores
4. **Flexibilidade**: Fácil adaptação para temas diferentes 