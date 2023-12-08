public class Menu {

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
            return this.price;
        }

    };

    public static class BeverageItem extends MenuItem {

        public BeverageItem(int price, String name, String description) {
            super(price, name, description);
        }

        public double getPriceWithDiscount(int discountPercent) {
            return this.price - (discountPercent * .01 * this.price);
        }
    };

    public static void printItemPrice(MenuItem item) {
        if (item instanceof BeverageItem) {
            System.out.println(((BeverageItem) item).getPriceWithDiscount(10));
        } else {
            System.out.println(item.getPrice());
        }
    }

    public static void main(String[] args) {
        MenuItem menuItem = new MenuItem(100, "Bread", "Wheat flour bread");
        BeverageItem beverageItem = new BeverageItem(60, "Coke", "Cold beverage");

        printItemPrice(menuItem);
        printItemPrice(beverageItem);
    }
}

/* O método printItemPrice(MenuItem item) verifica explicitamente se o item é uma instância de BeverageItem para chamar o método getPriceWithDiscount. 

Isso é um sinal de que o LSP está sendo violado, pois estamos tratando subtipos de maneira diferente. 

Isso significa que não podemos substituir um objeto MenuItem por um objeto BeverageItem sem alterar o comportamento do programa. */
