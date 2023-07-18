from selenium import webdriver
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver.firefox.service import Service
import time
from faker import Faker

# Inicializar o Faker
fake = Faker()

service_ = Service(GeckoDriverManager().install())

driver = webdriver.Firefox(service=service_)

driver.get("http://localhost:3000/")

time.sleep(1)
driver.find_element('xpath', '/html/body/div[1]/header/div/div/div/a[2]/button').click()
time.sleep(1)

# Gerar valores aleatórios
nome = fake.name()
email = fake.email()
cpf = fake.random_int(min=10000000000, max=99999999999)
phone = fake.random_int(min=10000000000, max=99999999999)
birth = fake.date_of_birth(minimum_age=18, maximum_age=90)
birth_str = birth.strftime("%d-%m-%Y")
cidade = fake.city()
password = fake.password()

driver.find_element('xpath', '//*[@id="nome"]').send_keys(nome)

driver.find_element('xpath', '//*[@id="email"]').send_keys(email)

driver.find_element('xpath', '//*[@id="cpf"]').send_keys(str(cpf))

driver.find_element('xpath', '//*[@id="phone"]').send_keys(str(phone))

driver.find_element('xpath', '//*[@id="birth"]').send_keys(str(birth))

driver.find_element('xpath', '//*[@id="cidade"]').send_keys(cidade)

driver.find_element('xpath', '//*[@id="password"]').send_keys(password)

driver.find_element('xpath', '//*[@id="confirmPassword"]').send_keys(password)
time.sleep(5)
driver.find_element('xpath', '/html/body/div[1]/div/div/div/div[2]/form/button').click()

# Resto do seu código...