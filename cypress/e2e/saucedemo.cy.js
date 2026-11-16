describe('SauceDemo E2E Testing - Login & Cart', () => {
  
  // Dijalankan otomatis sebelum setiap test case (it)
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('TC01 - Positive: Berhasil login dengan kredensial valid', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Validasi (Assertion): pindah ke halaman inventory & daftar produk tampil
    cy.url().should('include', '/inventory.html')
    cy.get('.inventory_list').should('be.visible')
  })

  it('TC02 - Negative: Gagal login dengan password salah', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('password_ngawur')
    cy.get('[data-test="login-button"]').click()

    // Validasi (Assertion): pesan error muncul dan teksnya sesuai
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match')
  })

  it('TC03 - Functional: Berhasil menambahkan produk ke keranjang', () => {
    // Login terlebih dahulu
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    // Klik tombol Add to Cart pada produk Backpack
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

    // Validasi: angka badge di ikon keranjang berubah menjadi 1
    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '1')
  })
})