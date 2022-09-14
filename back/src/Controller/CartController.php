<?php

namespace App\Controller;

use App\Entity\Article;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\Key;
use Firebase\JWT\JWT;
use App\Repository\CartRepository;
use App\Entity\Cart;
use App\Repository\AddressRepository;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

\EasyPost\EasyPost::setApiKey("EZTK13da0d692323492fa82f1e2b491dc33fajMtV3Zy8r3Q9uBDCZuZ1A");


class CartController extends AbstractController
{

  /*--------------------*\
    CREATE
  \*--------------------*/

  #[Route(path: '/create/cart/item', name: 'create_cart_item', methods: 'POST')]
  public function createCart(Request $request, ManagerRegistry $doctrine)
  {
    $data = json_decode($request->getContent());
    $token = $data->{'Headers'}->{'token'};
    $idArticle = $data->{'article'};

    // $service = $data->{'service'};

    try {
      //ne change surtout pas la clé
      $key = "LaClePourToken";
      $decoded = JWT::decode($token, new Key($key, 'HS256'));
      $cart = new Cart();
      $cart->setUserId($decoded->{'id'});
      $cart->setArticleId($idArticle);
      // $cart->setService($service);

      $entityManager = $doctrine->getManager();
      $entityManager->persist($cart);
      $entityManager->flush();


      return new Response("Done", 201);
    } catch (\Exception $e) {

      return $this->json("erreur");
    }
  }

  /*--------------------*\
    READ
  \*--------------------*/

  #[Route(path: '/read/cart/{id}', name: 'read_cart', methods: 'GET')]
  public function getCart(Request $request, CartRepository $CartRepository, ArticleRepository $articleRepository, UserRepository $userRepository, int $id)
  {

    // $articles = $repository->findAll();

    $token = $request->headers->get('Authorization');

    try {

      $key = "LaClePourToken";
      JWT::decode($token, new Key($key, 'HS256'));



      $Cart = $CartRepository->findBy(['user_id' => $id]);
      $User = $userRepository->findBy(['id' => $id]);

      $count = count($Cart);

      $tab = [];

      for ($i = 0; $i < $count; $i++) {

        $ArticleId = $Cart[$i]->getArticleId();
        $Article = $articleRepository->findBy(['id' => $ArticleId]);


        array_push($tab, $Article);
      }

      return $this->json($tab);
    } catch (\Exception $e) {

      return $this->json("erreur");
    }
  }

  /*--------------------*\
    UPDATE
  \*--------------------*/

  #[Route(path: '/update/cart/{id}', name: 'update_cart', methods: 'PUT')]
  public function editCarts(?Cart $cart, Request $request, ManagerRegistry $doctrine)
  {
    $data = json_decode($request->getContent());
    $code = 200;
    if (!$cart) {
      $cart = new Cart();
      $code = 201;
    }
    // $cart->setName($data->name);
    $entityManager = $doctrine->getManager();
    $entityManager->persist($cart);
    $entityManager->flush();
    return new Response("Done", $code);
  }

  /*--------------------*\
    DELETE
  \*--------------------*/

  #[Route(path: '/delete/cart/{id}', methods: 'DELETE')]
  public function deleteCart(Request $request, CartRepository $CartRepository, ManagerRegistry $doctrine, int $id)
  {

    $data = json_decode($request->getContent());
    $token = $request->headers->get('Authorization');
    // $idArticle = $data->{'article'};

    try {
      // ne changer surtout pas la clé
      $key = "LaClePourToken";
      $decode = JWT::decode($token, new Key($key, 'HS256'));
      $cart = $CartRepository->findBy(['user_id' => $decode->{"id"}, 'article_id' => $id]);
      $entityManager = $doctrine->getManager();
      $entityManager->remove($cart[0]);
      $entityManager->flush();

      return $this->json("delete successfull");
    } catch (\Exception $e) {

      return $this->json("erreur");
    }
  }


  #[Route(path: '/read/service', methods: 'POST')]
  public function readService(Request $request, ArticleRepository $article, UserRepository $user, CartRepository $cart, AddressRepository $address)
  {

    $data = json_decode($request->getContent());
    $token = $data->{'Headers'}->{'token'};

    try {
      // ne changer surtout pas la clé
      $key = "LaClePourToken";
      $decode = JWT::decode($token, new Key($key, 'HS256'));

      $Address = $address->findOneBy(['id' => $data->AddressId]);
      $User = $user->findOneBy(['id' => $data->UserId]);


      $Cart = $cart->findBy(['user_id' => $data->UserId]);
      $count = count($Cart);

      $total = 0;
      $length = 0;
      $width = 0;
      $height = 0;
      $weight = 0;

      for ($i = 0; $i < $count; $i++) {

        $ArticleId = $Cart[$i]->getArticleId();
        $Article = $article->findBy(['id' => $ArticleId]);

        $total += $Article[0]->getPrice();
        $length += $Article[0]->getLength();
        $width += $Article[0]->getWidth();
        $height += $Article[0]->getHeight();
        $weight += $Article[0]->getWeight();
      }

      $shipment = \EasyPost\Shipment::create([
        "from_address" => [
          "company" => "EasyPost",
          "street1" => "118 2nd Street",
          "city"    => "San Francisco",
          "state"   => "CA",
          "zip"     => "94105",
          "phone"   => "415-456-7890",
        ],
        "to_address" => [
          "name" => $User->getUsername(),
          "street1" => $Address->getStreet(),
          "city"    => $Address->getCity(),
          "state"   => $Address->getState(),
          "zip"     => $Address->getZip(),
          "phone"   => $User->getPhone(),
        ],
        "parcel" => [
          "length" => $length,
          "width"  => $width,
          "height" => $height,
          "weight" => $weight,
        ],
      ]);

      

      $tab = [$shipment->{'rates'}, $total, $shipment->{'created_at'}];

      return $this->json($tab);
    } catch (\Exception $e) {

      return $this->json($e);
    }
  }
}
