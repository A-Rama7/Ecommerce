<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Serializer;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\BankCardRepository;
use App\Entity\BankCard;
use Doctrine\ORM\EntityManagerInterface;


class BankCardController extends AbstractController
{

  #[Route(path: "/create/creditcard", name: "create_creditcard", methods: "POST")]
  public function createBankCard(Request $request, ManagerRegistry $doctrine)
  {
    $data = json_decode($request->getContent());
    $bankCard = new BankCard();
    $bankCard->setUserId($data->user_id);
    $bankCard->setName($data->name);
    $bankCard->setNumber($data->number);
    $bankCard->setExpiryDate($data->expiry_date);
    $bankCard->setCardVerificationValue($data->card_verification_value);
    $entityManager = $doctrine->getManager();
    $entityManager->persist($bankCard);
    $entityManager->flush();
    return new Response("", 201);
  }

  #[Route(path: '/read/creditcard/{user_id}', name: 'read_creditcard', methods: 'GET')]
  public function getCreditCard(BankCardRepository $bankCardRepository, int $user_id)
  {

    return $this->json($bankCardRepository->findOneBy(['user_id' => $user_id]));
  }

  #[Route(path: '/update/creditcard/{user_id}', name: 'update_creditcard', methods: 'PUT')]
  public function updateBankCard(?BankCard $bankCard, BankCardRepository $repo,Request $request, ManagerRegistry $doctrine)
  {
    $data = json_decode($request->getContent());

    $bankCard->setName($data->name);
    $bankCard->setNumber($data->number);
    $bankCard->setExpiryDate($data->expiryDate);
    $bankCard->setCardVerificationValue($data->cardVerificationValue);

    $entityManager = $doctrine->getManager();
    $entityManager->persist($bankCard);
    $entityManager->flush();

    return $this->json("done");
  }

  #[Route(path: '/delete/creditcard/{id}', name: 'delete_creditcard', methods: 'DELETE')]
  public function deleteBankCard(BankCard $bankCard, ManagerRegistry $doctrine)
  {
    $entityManager = $doctrine->getManager();
    $entityManager->remove($bankCard);
    $entityManager->flush();
    return new Response("", 200);
  }
}
