<?php

namespace App\Controller;

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
use App\Repository\OrderItemRepository;
use App\Repository\UserRepository;

class OrderItemController extends AbstractController
{

  /*--------------------*\
        ADD ORDER_ITEM
    \*--------------------*/
  #[Route('/create_order_item', name: 'create_order_item', methods: "PUT")]
  public function createOrder_item(?OrderItem $orderItem, Request $request, ManagerRegistry $doctrine)
  {
    $data = json_decode($request->getContent());
    $orderItem = new OrderItem();
    $orderItem->setProductId($data->productId);
    $orderItem->setOrderId($data->orderId);
    // $orderItem->setService($data->service);

    $entityManager = $doctrine->getManager();
    $entityManager->persist($orderItem);
    $entityManager->flush();
    $nbOrderItem = $orderItem->getId();

    $encoders = [new JsonEncoder()];
    $normalizers = [new ObjectNormalizer()];
    $serializer = new Serializer($normalizers, $encoders);
    $jsonContent = $serializer->serialize(
      $orderItem,
      "json",
      [
        "circular_reference_handler" => function ($object) {
          return $object->getId();
        }
      ]
    );
    $response = new Response($jsonContent);
    $response->headers->set("Content-Type", "application/json");
    return $response;
  }

  /*--------------------*\
        READ ORDER ITEM
    \*--------------------*/
  #[Route(path: 'read/Order_item/{id}', name: 'get_order_item', methods: 'GET')]
  public function getOrder(OrderItemRepository $orderItem, ArticleRepository $RepoArticle, int $id)
  {

    $orderItem = $orderItem->findBy(['order_id' => $id]);
    $count = count($orderItem);

    $tab = [];
    for ($i = 0; $i < $count; $i++) {
      $articleId = $orderItem[$i]->getProductId();
      $article = $RepoArticle->findBy(['id' => $articleId]);

      array_push($tab, $article);
    }

    return $this->json($tab);
  }
}
