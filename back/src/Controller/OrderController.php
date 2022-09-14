<?php

namespace App\Controller;

use App\Entity\Order;
use App\Entity\OrderItem;
use App\Repository\OrderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ArticleRepository;
use App\Repository\CartRepository;
use App\Repository\UserRepository;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
// use App\Repository\UserRepository;

class OrderController extends AbstractController
{

  /*--------------------*\
        ADD ORDER
    \*--------------------*/
  #[Route('/create_order', name: 'create_order', methods: "POST")]
  public function createOrder(Request $request, CartRepository $cart, EntityManagerInterface $manager)
  {
    $data = json_decode($request->getContent());
    $token = $data->Headers->token;

    try {

      $order = new Order();

      $key = "LaClePourToken";
      JWT::decode($token, new Key($key, 'HS256'));

      $order->setUserId($data->userId);
      $order->setPrice($data->price);
      $order->setService($data->service);
      $order->setTotal($data->total);
      $order->setCreationDate($data->date);
      $manager->persist($order);
      $manager->flush();

      if ($order->getId()) {

        $cart = $cart->findBy(['user_id' => $data->userId]);
        $countCart = count($cart);

        $tab = [];

        for ($i = 0; $i < $countCart; $i++) {
          $articleId = $cart[$i]->getArticleId();
          $orderItem = new OrderItem();
          $orderItem->setProductId($articleId);
          $orderItem->setOrderId($order->getId());
          $manager->persist($orderItem);
          $manager->flush();
        }
      }

      return $this->json("done");
    } catch (\Exception $e) {

      return $this->json($e);
    }
  }


  /*--------------------*\
        READ ORDER OF USER
    \*--------------------*/
  #[Route(path: 'read/Order/{id}', name: 'get_order', methods: 'GET')]
  public function getOrder(OrderRepository $OrderRepository, UserRepository $UserRepository, int $id)
  {

    $Order = $OrderRepository->findBy(['user_id' => $id]);

    return $this->json($Order);
  }


  #[Route(path: 'delete/order/{id}', name: 'remove_cart', methods: 'DELETE')]
  public function deleteOrder(CartRepository $cart, EntityManagerInterface $manager, int $id)
  {

    $Repo = $cart->findBy(['user_id' => $id]);

    $count = count($Repo);
    for ($i = 0; $i < $count; $i++) {
      $manager->remove($Repo[$i]);
      $manager->flush();
    }


    return $this->json("delete successfull");
  }


  #[Route(path: 'read/order/{id}', methods: 'GET')]
  public function readOrder(OrderRepository $order, int $id)
  {
    $result = $order->findOneBy(['id' => $id]);


    return $this->json($result);
  }
}
