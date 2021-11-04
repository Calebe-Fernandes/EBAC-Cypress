/// <reference types = "cypress"/>

describe('DevFinance', () =>{
    it('Adicionar nova transação de entrada', () => {
        //Chegar até o ambiente a ser testado
        cy.visit('https://devfinance-agilizei.netlify.app/#');
        ////Navegação dos elementos para adicionar uma transação de entrada (get & contains)
        cy.get('a[onclick*=open]').click();
        cy.get('#description').type('Freela');
        cy.get('#amount').type('12');
        cy.get('#date').type('2021-11-03');
        cy.contains('button','Salvar').click();
        //Verifica se a tabela possui uma transação
        cy.get('table tbody tr').should('have.length',1);
    });

    it('Adicionar nova transação de saída', () => {
        //Navegação dos elementos para adicionar uma transação de saída (get & contains)
        cy.get('a[onclick*=open]').click();
        cy.get('#description').type('Cafézinho');
        cy.get('#amount').type('-8');
        cy.get('#date').type('2021-11-03');
        cy.contains('button','Salvar').click();
        //Verifica se a tabela possui duas transações
        cy.get('table tbody tr').should('have.length',2);
    });

    it('Verificar se os valores das transações estão corretos', () => {
        // Verificar se o valor de entradas equivale a quantidade adicionada, removendo o caractere &nbsp
        cy.get('#incomeDisplay').contains('R$ 12,00');
        cy.get('#incomeDisplay').invoke('text').then((text) => {
          expect(text.replace(/\u00a0/g, ' ')).equal('R$ 12,00')
        });
        // Verificar se o valor de saídas equivale  a quantidade adicionada, removendo o caractere &nbsp
        cy.get('#expenseDisplay').contains('-R$ 8,00');
        cy.get('#expenseDisplay').invoke('text').then((text) => {
          expect(text.replace(/\u00a0/g, ' ')).equal('-R$ 8,00')
        });
        // Verificar se o valor de total equivale  à (entradas - saídas), removendo o caractere &nbsp
        cy.get('#totalDisplay').contains('R$ 4,00');
        cy.get('#totalDisplay').invoke('text').then((text) => {
          expect(text.replace(/\u00a0/g, ' ')).equal('R$ 4,00')
        });
    });

    it('Excluir uma entrada', () => {
        //Navegação dos elementos para adicionar uma transação de saída (get & contains)
        cy.get('[alt="Remover transação"]').first().click();
        //Verifica se a tabela possui uma transação
        cy.get('table tbody tr').should('have.length',1);
    });
});