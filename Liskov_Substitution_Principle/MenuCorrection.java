public class MenuCorrection {

    public static class MenuItem {
        public int price;
        public String name;
        public String description;

        public MenuItem(int price, String name, String description) {
            this.price = price;
            this.name = name;
            this.description = description;
        }

        public double getPrice() {
            return this.price - this.getDiscount();
        }

        // Adicionado o método getDiscount() na classe MenuItem
        private double getDiscount() {
            return 0;
        }

    };

    public static class BeverageItem extends MenuItem {

        public BeverageItem(int price, String name, String description) {
            super(price, name, description);
        }

        // Sobreescrevendo o método getPrice() da classe MenuItem
        public double getPrice() {
            return this.price - this.getDiscount();
        }
        
        // Sobreescrevendo o método getDiscount() da classe MenuItem
        private double getDiscount() {
            int discountPercent = 10;
            return discountPercent * .01 * this.price;
        }

    };

    public static void printItemPrice(MenuItem item) {
        /* Agora o método getPrice() se comporta de maneira consistente em ambas as classes e 
        não é necessário verificar explicitamente se o item é uma instância de BeverageItem para chamar o método getPriceWithDiscount. */
        System.out.println(item.getPrice()); 
    }

    public static void main(String[] args) {
        MenuItem menuItem = new MenuItem(100, "Bread", "Wheat flour bread");
        BeverageItem beverageItem = new BeverageItem(60, "Coke", "Cold beverage");

        printItemPrice(menuItem);
        printItemPrice(beverageItem);
    }
}


/* Isso significa que agora estamos tratando subtipos da mesma maneira, e podemos substituir um objeto MenuItem por um objeto BeverageItem sem alterar o comportamento 
do programa. */